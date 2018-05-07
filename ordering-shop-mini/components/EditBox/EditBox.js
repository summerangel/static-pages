// components/EditBox/EditBox.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
   /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    //弹窗标题
    title: {         //属性名
      type: String,  //类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null(表示任意类型)
      value: '标题'
    },
    //弹窗内容
    value: {
      type: String,
      value: ''
    },
    //确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    }
  },
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    //弹窗显示控制
    isShow: false
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _closeBoxEvent() {
      //触发取消回调
      this.triggerEvent("closeBoxEvent");
    },
    _inputEvent(e) {
      this.triggerEvent('inputEvent', {value: e.detail.value});
    },
    _deleteInputEvent() {
      this.triggerEvent("deleteInputEvent");
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  } 
})