// pages/MenuAdd/MenuAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryName: '',
    categoryList: ['热销榜单', '开胃凉菜', '面食汤点', '精品热菜', '饭后水果'],
    imagePath: '',
    btnText: '确定添加'
  },

  getBtnText() {//暂时根据菜品分类是否有值来判断是否编辑，到时可以根据该页所调接口返回的id来判断
    const categoryList = this.data.categoryList;
    if (categoryList.length > 0) {
      this.setData({
        btnText: '确定重新上架'
      })
    } else {
      this.setData({
        btnText: '确定重新上架'
      })
    }
  },

  chooseImage() {
    const that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imagePath: res.tempFilePaths
        })
        console.log('imagePath', that.data.imagePath);
      }
    })
  },

  showDialog() {
    this.editBox.showDialog();
  },

  //关闭弹框事件
  _closeBoxEvent() {
    this.editBox.hideDialog();
  },

  _inputEvent(e) {
    const value = e.detail.value;
    if (value.length > 4) {
      this.setData({
        categoryName: value.substring(0, 4)
      })
    } else {
      this.setData({
        categoryName: value
      })
    }
  },

  //清空输入事件
  _deleteInputEvent() {
    this.setData({
      categoryName: ''
    })
  },

  //确认事件
  _confirmEvent() {
    let categoryList = this.data.categoryList;
    const isHas = (categoryList.indexOf(this.data.categoryName) > -1);
    if (!isHas) {
      categoryList.push(this.data.categoryName);
    }
    this.setData({
      categoryList,
      categoryName: ''
    })
    this.editBox.hideDialog();
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
    this.editBox = this.selectComponent("#edit-box");
    this.getBtnText();
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