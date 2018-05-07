// pages/ShopHome/ShopHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currIndex: 0, //tab 选中
    isExpandFilter: false, //是否展开订单筛选条件
    selectedFilterIndex: 0, //选中的筛选条件
    filterList: [
      {
        id: 0,
        text: '今日订单',
        isSelected: true
      },{
        id: 1,
        text: '近7天订单',
        isSelected: false
      },{
        id: 2,
        text: '近30天订单',
        isSelected: false
      }
    ]
  },

  cancelOrder() {
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

  tabSelectHandle(e) {
    const currIndex = e.currentTarget.dataset.index;
    this.setData({
      currIndex
    })
  },

  playOrderAudio() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://172.29.32.148:8088/ordering/static/voice_new_order.mp3';
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  uploadStaticAudio() {

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
    this.playOrderAudio();
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