/**
 * Created by summer on 16/8/4.
 */
(function(){
  'use strict';

  angular
    .module('tradingsite')
    .controller('homeController',homeController);

  /** @ngInject */
  function homeController($scope){
    var vm=this;
    vm.isShowNews=false;  //是否显示通知
    vm.isShowCate=false;  //是否显示全部分类
    vm.showTab=0;  //显示哪个tab页
    vm.showLeftTab=0; //显示左边tab页
    vm.showBookDetail=false; //是否显示
    $('#marquee').bxSlider({
      auto: true,
      autoHover:true,
      startSlide:1
    });
  }

})();
