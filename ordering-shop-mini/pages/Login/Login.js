// pages/Login/Login.js
import { COUNT_DOWN_NUMBER } from '../../utils/data.js';
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    constDownNum: COUNT_DOWN_NUMBER,
    countDownNum: COUNT_DOWN_NUMBER,
    codeShow: '获取验证码'
  },

  codeGet() {
    if (this.data.countDownNum != COUNT_DOWN_NUMBER) {
      return;
    }
    const countDownInterval = setInterval(() => {
      let countDownNum = this.data.countDownNum;
      if (countDownNum > 0) {
        countDownNum--;
        this.setData({
          countDownNum,
          codeShow: `${countDownNum}s`
        })
      } else {
        this.setData({
          countDownNum: COUNT_DOWN_NUMBER,
          codeShow: '获取验证码'
        })
        clearInterval(countDownInterval);
      }
    }, 1000)
  },

  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '13300982568',
    })
  },

  confirmLogin() {
    wx.showToast({
      title: '验证码错误',
      icon: 'none'
    })
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