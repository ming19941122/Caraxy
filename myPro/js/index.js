//视差效果
var _projectBox=$(".projectBox");
var _proH3=_projectBox.find("h3:first");
var _proH3Height=_proH3.height();
//var _proH3Top=_proH3.offset().top;
var _proH4=_projectBox.find("h4:first");
var _proH4Height=_proH4.height();
//var _proH4Top=_proH4.offset().top;
$(".parallax").parallax({proportion:0.3,callback:function(obj){
    }});
$("#continue").parallax({proportion:0.2});

//首页轮播
$(".indexWheel").indexWheel({time:0});
$(".ganyanWheel").indexWheel({speed:400,time:4000,isTextFade:false});
$(".projectWheel").indexWheel({speed:400,time:4000,isTextFade:false});
$(".caseWheel").indexWheel({speed:300,time:4000,isTextFade:false})
$(".zoom_slider").custoersWheel({})

//背景轮播
var  timer=null;
var  bjWheel=0;
var  imglen=$("#slider li").length;
var  stop=$(".rslides1_nav");
var  prev=$(".prev");
var  next=$(".next");
    prev.on("click",function () {
        bjWheel--;
        if(bjWheel<0){bjWheel = imglen-1}
        selectimg(bjWheel)
    });
    next.on("click",function () {
        bjWheel++;
        if(bjWheel==imglen){bjWheel=0}
        selectimg(bjWheel);
    });
    stop.hover(
        function () {
            clearInterval(timer)
        },
        function(){
            autoPlay()
        })
 function autoPlay() {
   timer= setInterval(function () {
         bjWheel++;
         if (bjWheel == imglen) {
             bjWheel = 0;
         }
         selectimg(bjWheel);
     },4000);
 }
function selectimg(){
     $("#slider li").eq(bjWheel).addClass("rslides1_on").fadeIn(1000).siblings("li").fadeOut(500).removeClass("rslides_on");
 };

autoPlay()



//商品详情图片点击选中


  //选择图片
$(document).on("click",".thumbelina li",function () {
    var imgL=$(".cloudzoom");
    var imgS=$(".cloudzoom-gallery-active img").attr("src")
    var _this=$(this);
    if(_this.hasClass("cloudzoom-gallery-active")){
        _this.removeClass("cloudzoom-gallery-active");
    }else{
        _this.addClass("cloudzoom-gallery-active").siblings("li").removeClass("cloudzoom-gallery-active")
    }
    // 更改大图片
   imgL.attr("src",imgS)

});




//挑选钻石

$(document).on("click",".shape a,.color a",function(){
    var _this=$(this)
    if(_this.hasClass("on")){
        _this.removeClass("on");
    }else{
        _this.addClass("on").siblings("a").removeClass("on");
    }
});

$(".shape>a").hover(
   function (){
       var _this=$(this);
       var _exhibition=_this.siblings(".exhibition")

       _exhibition.find("img").hide().eq(_this.index()).show();
       _exhibition.stop(false,false).fadeToggle()
   },
    function (){
        var _this=$(this);
        var _exhibition=_this.siblings(".exhibition")
        _exhibition.stop(false,false).fadeToggle()
        _exhibition.find("img").hide();
    }

)

// 首页 精选款式--商品数据动态加载
$.ajax({
    url:"http://localhost:3030/product/fashion",
    type:"get",
    dataType:"json",
    success:function () {

    }
});