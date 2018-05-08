/**
 * Created by summer on 16/10/9.
 */
(function($){
    //实例化插件
    $.fn.extend({
        headerPlugin:function(options){
            var defaults={};
            var opts=$.extend({},defaults,options);
            return this.each(function(){
                var $this=$(this);
                var o = $.meta ? $.extend({},opts,$this.data()) : opts;
                if(o.id==0){
                    $(this).remove();
                    return;
                }
                var str = new StringBuilder();
                str.AppendFormat('<div class="nav_header">');
                str.AppendFormat('<a href="#" class="navbar-brand">');
                str.AppendFormat('<i class="icon iconfont icon-aliyingye admin_logo"></i>');
                str.AppendFormat('</a>');
                str.AppendFormat('</div>');
                str.AppendFormat('<div class="header_right">');
                str.AppendFormat('<ul class="nav_right">');
                str.AppendFormat('<li class="dropdown">');
                str.AppendFormat('<a href="#" class="">');
                str.AppendFormat('<i id="view-fullscreen" class="icon iconfont icon-quanping"></i>');
                str.AppendFormat('<i id="cancel-fullscreen" style="display: none;" class="icon iconfont icon-feiquanping"></i>');
                str.AppendFormat('</a>');
                str.AppendFormat('</li>');
                str.AppendFormat('<li class="dropdown">');
                str.AppendFormat('<a href="#" class="dropdown-toggle">');
                str.AppendFormat('<i class="icon iconfont icon-tongzhishixin tongzhi"></i>');
                str.AppendFormat('<span class="badge">2</span>');
                str.AppendFormat('</a>');
                str.AppendFormat('</li>');
                str.AppendFormat('<li id="shop_name" class="dropdown" >');
                str.AppendFormat('<a href="" class="dropdown-toggle clear">');
                str.AppendFormat('<span class="title">上堡古国黄桑</span>');
                str.AppendFormat('<b class="caret"></b>');
                str.AppendFormat('</a>');
                str.AppendFormat('<div class="dropdown_set">');
                str.AppendFormat('<i class="icon iconfont icon-arrowshixin arrowup"></i>');
                str.AppendFormat('<ul class="set_ul">');
                str.AppendFormat('<li class="set_li">切换店铺</li>');
                str.AppendFormat('<li class="set_li">店铺设置</li>');
                str.AppendFormat('<li class="set_li">个人中心</li>');
                str.AppendFormat('<li class="set_li">退出</li>');
                str.AppendFormat('</ul>');
                str.AppendFormat('</div>');
                str.AppendFormat('</li>');
                str.AppendFormat('</ul></div>');

                $($this).append(str.ToString());

                //全屏、退出全屏处理
                var viewFullScreen = document.getElementById("view-fullscreen");
                var cancelFullScreen = document.getElementById("cancel-fullscreen");
                if (viewFullScreen) {
                    viewFullScreen.addEventListener("click", function () {
                        var docElm = document.documentElement;
                        if (docElm.requestFullscreen) {
                            docElm.requestFullscreen();
                        }
                        else if (docElm.msRequestFullscreen) {
                            docElm.msRequestFullscreen();
                        }
                        else if (docElm.mozRequestFullScreen) {
                            docElm.mozRequestFullScreen();
                        }
                        else if (docElm.webkitRequestFullScreen) {
                            docElm.webkitRequestFullScreen();
                        }
                    }, false);
                }

                if (cancelFullScreen) {
                    cancelFullScreen.addEventListener("click", function () {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        }
                        else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }
                        else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        }
                        else if (document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen();
                        }
                    }, false);
                }
                //当按下esc时处理全屏icon
                document.addEventListener("fullscreenchange", function () {
                    viewFullScreen.style.display = (document.fullscreenElement)? "none" : "block";
                    cancelFullScreen.style.display = (document.fullscreenElement)? "block" : "none";
                }, false);

                document.addEventListener("msfullscreenchange", function () {
                    viewFullScreen.style.display = (document.msFullscreenElement)? "none" : "block";
                    cancelFullScreen.style.display = (document.msFullscreenElement)? "block" : "none";
                }, false);

                document.addEventListener("mozfullscreenchange", function () {
                    viewFullScreen.style.display = (document.mozFullScreen)? "none" : "block";
                    cancelFullScreen.style.display = (document.mozFullScreen)? "block" : "none";
                }, false);

                document.addEventListener("webkitfullscreenchange", function () {
                    viewFullScreen.style.display = (document.webkitIsFullScreen)? "none" : "block";
                    cancelFullScreen.style.display = (document.webkitIsFullScreen)? "block" : "none";
                }, false);

                //鼠标悬浮处理
                $('#shop_name').mouseover(function(){
                    $('.dropdown_set').css('display','block');
                });
                $('#shop_name').mouseleave(function(){
                    $('.dropdown_set').css('display','none');
                });
                //    右上角鼠标悬浮事件
                $('.set_li').each(function(index,val){
                    $(val).mouseover(function(){
                        $(val).siblings().removeClass('selected');
                        $(val).addClass('selected');
                    });
                });
            })
        },
        navAsidePlugin:function(options){
            var defaults={};
            var navList=[];  //获取菜单
            var opts = $.extend({},defaults,options);
            //ajax方法
            function post(url,reqData,callBack,failCallBack){
                $.ajax({
                    type:'get',
                    url:url,
                    data:reqData,
                    success:function(result){
                        callBack(result);
                    },
                    failure:function(result){
                        failCallBack(result);
                    }
                })
            }
            //构造二级菜单
            function getSecondNavDom(children){
                if(children&&children.length>0){
                    var second_li='';
                    $('.second_nav').empty();
                    for(var i=0;i<children.length;i++){
                        if(i==0){ //当为标题时
                            second_li=second_li+'<li class="second_li"><a style="cursor: default;"><span class="second_name"><i style="margin-right: 3px;" class="'+children[i].icon+'"></i>'+children[i].name+'</span></a></li>';
                        }else if(i==1){//默认选中二级菜单的第一个
                            second_li=second_li+'<li class="second_li"><a class="second_selected" href="'+children[i].href+'"><span class="second_name">'+children[i].name+'</span></a></li>';
                        }
                        else{
                            second_li=second_li+'<li class="second_li"><a href="'+children[i].href+'"><span class="second_name">'+children[i].name+'</span></a></li>';
                        }
                    }
                    $('.second_nav').append(second_li);
                    //    二级菜单鼠标悬浮事件
                    $('.second_li').each(function(index,val){
                        if(index!=0){//二级菜单第一个不触发事件
                            $(val).mouseover(function(){
                                $(val).siblings().find('a').removeClass('second_selected');
                                $(val).find('a').addClass('second_selected');
                            });
                        }
                    });
                }
            }
            //获取数据，构造dom树
            function getNavDom(){
                $.getJSON('../../plugin/navList.json',{},function(data){
                    navList=data;
                    var li='';
                    if(data&&data.length>0){
                        for(var i=0;i<data.length;i++){
                            if(i==0){//首次加载导航栏数据，默认加载出一级导航第一个的二级菜单
                                li=li+'<li class="nav_li" value="'+data[i].id+'"><a href="#" class="nav_selected"><i class="'+data[i].icon+'"></i><span class="nav_name">'+data[i].name+'</span></a></li>';
                                getSecondNavDom(data[i].children);
                            }
                            else{
                                li=li+'<li class="nav_li" value="'+data[i].id+'"><a href="#"><i class="'+data[i].icon+'"></i><span class="nav_name">'+data[i].name+'</span></a></li>';
                            }
                        }
                    }
                    $('.nav').append(li);
                    //    一级菜单鼠标悬浮事件
                    $('.nav_li').each(function(index,val){
                        $(val).mouseover(function(){
                            $(val).siblings().find('a').removeClass('nav_selected');
                            $(val).find('a').addClass('nav_selected');
                            getSecondNavDom(navList[index].children);
                        });
                    });
                });
            }
            return this.each(function(){
                var $this=$(this);
                var o= $.meta ? $.extend({},opts,$(this).data()) : opts;
                if(o.id==0){
                    $(this).remove();
                    return;
                }
                var str= new StringBuilder();
                str.AppendFormat('<div class="nav_aside">');
                str.AppendFormat('<div class="aside_wrap">');
                str.AppendFormat('<nav class="navi">');
                str.AppendFormat('<ul class="nav">');

                // str.AppendFormat('<li><a><i class="icon iconfont icon-shop"></i>');
                // str.AppendFormat('<span class="nav_name">店铺</span></a></li>');
                // str.AppendFormat('<li><a><i class="icon iconfont icon-product"></i>');
                // str.AppendFormat('<span class="nav_name">产品</span></a></li>');
                // str.AppendFormat('<li><a><i class="icon iconfont icon-xingcheng"></i>');
                // str.AppendFormat('<span class="nav_name">行程</span></a></li>');
                // str.AppendFormat('<li><a><i class="icon iconfont icon-order"></i>');
                // str.AppendFormat('<span class="nav_name">订单</span></a></li>');
                // str.AppendFormat('<li><a><i class="icon iconfont icon-category"></i>');
                // str.AppendFormat('<span class="nav_name">分销</span></a></li>');
                // str.AppendFormat('<li><a><i class="icon iconfont icon-employer"></i>');
                // str.AppendFormat('<span class="nav_name">店员</span></a></li>');
                // str.AppendFormat('<li><a><i class="icon iconfont icon-data"></i>');
                // str.AppendFormat('<span class="nav_name">数据</span></a></li>');
                // str.AppendFormat('<li><a><i class="icon iconfont icon-help"></i>');
                // str.AppendFormat('<span class="nav_name">帮助</span></a></li></ul></nav>');
                str.AppendFormat('</ul></nav>');
                str.AppendFormat('<nav class="second_navi">');
                str.AppendFormat('<ul class="second_nav">');
                // str.AppendFormat('<li class="second_li"><a href="#"><span class="second_name">店铺管理</span>');
                // str.AppendFormat('</a></li>');
                // str.AppendFormat('<li class="second_li"><a href="#" class="second_selected"><span class="second_name">店铺中心</span>');
                // str.AppendFormat('</a></li>');
                // str.AppendFormat('<li class="second_li"><a href="#"><span class="second_name">基本信息</span>');
                // str.AppendFormat('</a></li>');
                // str.AppendFormat('<li class="second_li"><a href="#"><span class="second_name">认证信息</span>');
                // str.AppendFormat('</a></li>');
                // str.AppendFormat('<li class="second_li"><a href="#"><span class="second_name">资金管理</span>');
                // str.AppendFormat('</a></li></ul></nav>');
                str.AppendFormat('</ul></nav>');
                str.AppendFormat('</div></div>');
                $($this).append(str.ToString());
                getNavDom();
            })
        }
    })
})(jQuery)