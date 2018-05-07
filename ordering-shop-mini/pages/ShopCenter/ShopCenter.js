// pages/ShopCenter/ShopCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isExpandFilter: false, //是否展开订单筛选条件
    selectedFilterIndex: 0, //选中的筛选条件
    filterList: [
      {
        id: 0,
        text: '休息中',
        isSelected: true
      }, {
        id: 1,
        text: '营业中',
        isSelected: false
      }
    ],
    selectedTimeFilterIndex: 0,
    timeFilterList: [
      {
        id: 0,
        text: '今天',
        isSelected: true
      }, {
        id: 1,
        text: '近7天',
        isSelected: false
      }, {
        id: 2,
        text: '近30天',
        isSelected: false
      }
    ],
    
    selectedShow: '暂无设置',
    multiIndex: [0, 0, 0],
    multiArray: [['8:00', '9:00', '10:00', '11:00', '12:00'], ['19:00', '20:00', '21:00', '22:00', '23:00']]
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const multiArray = this.data.multiArray;
    const multiIndex = this.data.multiIndex;
    this.setData({
      selectedShow: (multiArray[0][multiIndex[0]] + '-' + multiArray[1][multiIndex[1]])
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  filterTapHandle() {
    this.setData({
      isExpandFilter: !this.data.isExpandFilter
    })
  },

  filterSelectHandle(e) {
    const id = e.currentTarget.dataset.filter;
    const filterList = this.data.filterList;
    let selectedFilterIndex = 0;
    filterList.forEach((item, index) => {
      item.isSelected = false;
      if (item.id == id) {
        item.isSelected = true;
        selectedFilterIndex = index;
      }
    });
    this.setData({
      filterList,
      selectedFilterIndex
    })
    this.filterTapHandle();
  },

  timeFilterSelectHandle(e) {
    const id = e.currentTarget.dataset.filter;
    const timeFilterList = this.data.timeFilterList;
    let selectedTimeFilterIndex = 0;
    timeFilterList.forEach((item, index) => {
      item.isSelected = false;
      if (item.id == id) {
        item.isSelected = true;
        selectedTimeFilterIndex = index;
      }
    });
    this.setData({
      timeFilterList,
      selectedTimeFilterIndex
    })
  },

  confirmLogout() {
    this.showDialog();
  },

  showDialog() {
    this.dialog.showDialog();
  },

  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },

  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})