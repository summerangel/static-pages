// pages/MenuList/MenuList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currIndex: 0,
    menuList: [
      {
        isExpand: false,
        cateName: '热销榜单',
        cateNum: 6,
        goodsList: [
          {
            goodsImage: "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '招牌红烧排骨',
            goodsPrice: 55
          }, {
            goodsImage: "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '特色油炸桂鱼',
            goodsPrice: 25.9
          }, {
            goodsImage: "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '精品时蔬茼蒿',
            goodsPrice: 25.9
          }
        ]
      }, {
        isExpand: false,
        cateName: '开胃凉菜',
        cateNum: 3,
        goodsList: [
          {
            goodsImage: "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '招牌红烧排骨',
            goodsPrice: 55
          }, {
            goodsImage: "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '特色油炸桂鱼',
            goodsPrice: 25.9
          }, {
            goodsImage: "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '精品时蔬茼蒿',
            goodsPrice: 25.9
          }
        ]
      }, {
        isExpand: false,
        cateName: '面食汤点',
        cateNum: 5,
        goodsList: [
          {
            goodsImage: "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '招牌红烧排骨',
            goodsPrice: 55
          }, {
            goodsImage: "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '特色油炸桂鱼',
            goodsPrice: 25.9
          }, {
            goodsImage: "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '精品时蔬茼蒿',
            goodsPrice: 25.9
          }
        ]
      }, {
        isExpand: false,
        cateName: '精品热菜',
        cateNum: 9,
        goodsList: [
          {
            goodsImage: "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '招牌红烧排骨',
            goodsPrice: 55
          }, {
            goodsImage: "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '特色油炸桂鱼',
            goodsPrice: 25.9
          }, {
            goodsImage: "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '精品时蔬茼蒿',
            goodsPrice: 25.9
          }
        ]
      }, {
        isExpand: false,
        cateName: '饭后水果',
        cateNum: 2,
        goodsList: [
          {
            goodsImage: "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '招牌红烧排骨',
            goodsPrice: 55
          }, {
            goodsImage: "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '特色油炸桂鱼',
            goodsPrice: 25.9
          }, {
            goodsImage: "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
            goodsName: '精品时蔬茼蒿',
            goodsPrice: 25.9
          }
        ]
      }
    ]
  },

  tabSelect(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currIndex: index
    })
  },

  cateTapHandler(e) {
    const index = e.currentTarget.dataset.parentindex;
    const menuList = this.data.menuList;
    menuList[index].isExpand = !menuList[index].isExpand;
    this.setData({
      menuList
    })
  },

  shelfGoods() {
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