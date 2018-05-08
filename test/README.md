# test
do some tests
1.圆形进度条参考：http://www.tuicool.com/articles/AVRvmqm
2.文字过长css:1 overflow: hidden;2 text-overflow: ellipsis;3 white-space: nowrap;
3.添加图片css代码： .addpic{ padding: 14px 14px 14px; .addpictitle{ font-weight: bold; } .addpics{ overflow: hidden; margin:10px 0; .addpicbtn{ width: 32%; height: 120px; display: block; float: left; background: #e0ded9; text-align: center; line-height: 120px; margin-right: 1%; position: relative; img{ width: 100%; height: auto; } } .fileContainer [type=file] { opacity: 0 !important; position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; height: 100% !important; } } }
4.时间转化：1.将时间戳转化为普通格式时需要:  2015-15-06 16:05:50 换成  2015/12/06 15：02：60（苹果安卓都适用）2.$filter('date')(todayTime+72*3600*1000,'yyyy/MM/dd').replace(/\//g,'-');
5.css兼容性网址：http://www.wufangbo.com/ie10-css-hack/
                 http://www.cr173.com/html/17948_1.html
                 http://www.duitang.com/static/csshack.html
                 http://www.jb51.net/css/67630.html
                 http://my.oschina.net/jack088/blog/390976?p=1
6.二维数组：pageData.allLength=data.result.list.length;//记录之前数组长度for(var i=0;i<data.result.list.length;i++){
    pageData.dataList[i]=new Array();
    pageData.dataList[i][0]=data.result.list[i];
    pageData.dataList[i][1]=data.result.list[i+1];
    data.result.list.splice(i+1,1);
}
7.angular:1.转化为json格式：angular.toJson(vm.dataInfo);2.注入$localStorage
if ($localStorage.goodsCart == undefined) {
    $localStorage.goodsCart = [];
}
8.localStorage.setItem('goodsInfo',JSON.stringify(goodsInfo));
  pageData.goodsInfo=JSON.parse(localStorage.getItem('goodsInfo'));
9.checkbox参考网址：http://www.cnblogs.com/qqzy168/archive/2013/03/11/2953492.html
10.ChartJs参考网址：https://segmentfault.com/a/1190000004035743
11.angular输入正整数:1.<input type="number" class="shuru" min="0" placeholder="1" ng-pattern="/^[0-9]+$/" ng-model="pageData.goodsCount">
2.只能输入或粘贴数字的：
<input onkeyup="value=value.replace(/[^\d]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
那就这样写，匹配数字或包含最多两位小数的数字：
<input onkeyup="if(this.value==this.value2)return;if(this.value.search(/^\d*(?:\.\d{0,2})?$/)==-1)this.value=(this.value2)?this.value2:'';else this.value2=this.value;">

12.angular unsafe问题：unsafe:这个怎么解决加载src的时候angular会把认为不安全的url前面加个这个玩意unsafe:，这怎么去掉啊
http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
13.//ajax请求，data为一个对象dataobj{type:请求类型；url:请求链接;data:请求参数}
function ajaxReq(dataobj, callback, failback) {
    var basePath='';
    if (location.hostname.match('localhost') || location.hostname.match('192.168.')) {
        basePath = 'http://dev1.comeoncloud.net';
    }
    dataobj.url=basePath+dataobj.url;

    var layerIndex = layer.open({type:2,shadeClose:false});

    $.ajax({
        type: dataobj.type,  //提交方式
        url: dataobj.url,//路径
        data: dataobj.data,//数据，这里使用的是Json格式进行传输
        dataType: "json",
        success: function (result) {//返回数据根据结果进行相应的处理            
            callback(result);
            layer.close(layerIndex);
        },
        error: function (result) {
            failback(result);
            layer.close(layerIndex);
        }
    });


}
