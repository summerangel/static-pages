//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.startConnect();
  },
  startConnect: function () {
    var that = this;
    wx.showLoading({
      title: '开启蓝牙适配'
    });
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log("初始化蓝牙适配器");
        console.log(res);
        that.getBluetoothAdapterState();
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '蓝牙初始化失败',
          icon: 'success',
          duration: 2000
        })

        setTimeout(function() {
          wx.hideToast();
        }, 2000)
      }
    });

    wx.onBluetoothAdapterStateChange(function(res){
      var available = res.available;
      if (available) {
        that.getBluetoothAdapterState();
      }
    })
  },
  getBluetoothAdapterState: function () {
    var that = this;
    wx.getBluetoothAdapterState({
      success: function(res) {
        var available = res.available,
        discovering = res.discovering;
        if (!available) {
          wx.showToast({
            title: '设备无法开启蓝牙连接',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        } else {
          if (!discovering) {
            that.startBluetoothDevicesDiscovery();
            that.getConnectedBluetoothDevices();
          }
        }
      }
    })
  },
  startBluetoothDevicesDiscovery: function () {
    var that = this;
    wx.showLoading({
      title: '蓝牙搜索',
    });
    wx.startBluetoothDevicesDiscovery({
      services: [],
      allowDuplicatesKey: false,
      success: function(res) {
        if (!res.isDiscovering) {
          that.getBluetoothAdapterState();
        } else {
          that.onBluetoothDeviceFound();
        }
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  getConnectedBluetoothDevices: function () {
    var that = this;
    wx.getConnectedBluetoothDevices({
      services: [that.serviceId],
      success: function(res) {
        console.log("获取处于连接状态的设备", res);
        var devices = res['devices'], flag = false, index = 0, conDevList = [];
        devices.forEach(function (value, index, array) {
          if (value['name'].indexOf('FeiZhi') != -1) {
            // 如果存在包含FeiZhi字段的设备
            flag = true;
            index += 1;
            conDevList.push(value['deviceId']);
            that.deviceId = value['deviceId'];
            return;
          }
        });
        if (flag) {
          this.connectDeviceIndex = 0;
          that.loopConnect(conDevList);
        } else {
          if (!this.getConnectedTimer) {
            that.getConnectedTimer = setTimeout(function () {
              that.getConnectedBluetoothDevices();
            }, 5000)
          }
        }
      },
      fail: function (err) {
        if (!this.getConnectedTimer) {
          that.getConnectedTimer = setTimeout(function () {
            that.getConnectedBluetoothDevices();
          }, 5000);
        }
      }
    })
  },
  onBluetoothDeviceFound: function () {
    var that = this;
    console.log('onBluetoothDeviceFound');
    wx.onBluetoothDeviceFound(function (res) {
      console.log('new device list has founded')
      console.log(res);
      if (res.devices[0]) {
        var name = res.devices[0]['name'];
        if (name != '') {
          if (name.indexOf('FeiZhi') != -1) {
            var deviceId = res.devices[0]['deviceId'];
            that.deviceId = deviceId;
            console.log(that.deviceId);
            that.startConnectDevices();
          }
        }
      }
    })
  },
  startConnectDevices: function (ltype, array) {
    var that = this;
    clearTimeout(that.getConnectedTimer);
    that.getConnectedTimer = null;
    clearTimeout(that.discoverDevicesTimer);
    that.stopBluetoothDevicesDiscovery();
    this.isConnectting = true;
    wx.createBLEConnection({
      deviceId: that.deviceId,
      success: function(res) {
        if (res.errCode == 0) {
          setTimeout(function () {
            that.getService(that.deviceId);
          }, 5000)
        }
      },
      fail: function (res) {
        console.log('连接失败：', err);
        if (ltype == 'loop') {
          that.connectDeviceIndex += 1;
          that.loopConnect(array);
        } else {
          that.startBluetoothDevicesDiscovery();
          that.getConnectedBluetoothDevices();
        }
      },
      complete: function () {
        console.log('complete connect devices');
        this.isConnectting = false;
      }
    });
  },
  getService: function (deviceId) {
    var that = this;
    //监听蓝牙连接
    wx.onBLEConnectionStateChange(function(res){
      console.log(res);
    });
    //获取蓝牙设备service值
    wx.getBLEDeviceServices({
      deviceId: deviceId,
      success: function(res) {
        that.getCharacter(deviceId, res.services);
      },
    })
  },
  getCharacter: function (deviceId, services) {
    var that = this;
    services.forEach(function (value, index, array) {
      if (value == that.serviceId) {
        that.serviceId = array[index];
      }
    });
    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: that.serviceId,
      success: function(res) {
        that.writeBLECharacteristicValue(deviceId, that.serviceId, that.characterId_write);
        that.openNotifyService(deviceId, that.serviceId, that.characterId_read);
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        console.log('complete');
      }
    })
  },
  loopConnect: function (devicesId) {
    var that = this;
    var listLen = devicesId.length;
    if (devicesId[this.connectDeviceIndex]) {
      this.deviceId = devicesId[this.connectDeviceIndex];
      this.startConnectDevices('loop', devicesId);
    } else {
      console.log('已配对的设备小程序蓝牙连接失败');
      that.startBluetoothDevicesDiscovery();
      that.getConnectedBluetoothDevices();
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
})