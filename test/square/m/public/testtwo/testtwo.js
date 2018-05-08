/**
 * Created by add on 2015/12/31.
 */
purifiermodule.controller('filterCtrl',['$scope','commService','$localStorage','radialIndicatorInstance',function($scope,commService,$localStorage,radialIndicatorInstance){
    var pageFunc=$scope.pageFunc={};
    var pageData=$scope.pageData={
        title:'滤芯详情',
        controllerDetailJson:[], //控制器详情
        percent:5,  //
        ShowPercent:0,
        Rdeg:0,
        Ldeg:0
    };
    document.title=pageData.title;
    //$scope.indicatorOption = {
    //    radius : 80,
    //    percentage :true,
    //    barColor : "#87CEEB"
    //};
    //
    //$scope.indicatorValue = 70;
    //滤网重置
    pageFunc.resetFilter=function(){
        commService.resetFilterTime({
            deviceId:pageData.controllerDetailJson.deviceId
        },function(data){
            if(data.status){

            }
            else{
                alert('滤网重置失败');
            }
        },function(data){
            alert('滤网重置请求失败');
        });
    };
    //计算百分比
    pageFunc.calculatePerc=function(num,n){
        var  Rdeg = num > n ? n : num,
            Ldeg = num > n ? num - n : 0;
        pageData.ShowPercent=num;
        pageData.Rdeg=(360/(2*n)*Rdeg-180);
        pageData.Ldeg=(360/(2*n)*Ldeg-180);
    };
    //初始化
    pageFunc.init=function(){
        if($localStorage.controllerDetailJson==undefined){
            $localStorage.controllerDetailJson=[];
        }
        pageData.controllerDetailJson=$localStorage.controllerDetailJson;
        console.log(pageData.controllerDetailJson);
        pageData.percent=(pageData.controllerDetailJson.filterHours/pageData.controllerDetailJson.filterScreenTimeLimit).toFixed(2)*100;
        //pageData.percent=(Math.ceil(pageData.controllerDetailJson.filterHours/pageData.controllerDetailJson.filterScreenTimeLimit))*100;
        pageFunc.calculatePerc(pageData.percent,50);
    };
    pageFunc.init();

    $scope.indicatorOption = {
        percentage: true,
        radius:90,
        barColor: "#00AE7F",
        initValue : pageData.percent
    };
    //$scope.changeValue = function(val) {
    //    radialIndicatorInstance['indicator1'].animate(30);
    //};

}]);