

/*
 *   视差
 *   proportion:视差滚动比例
 *   start:相对于屏幕视差开始滚动的位置,默认到屏幕30%时开始视差滚动
 *   expr:视差滚动元素的表达式
 *   callback:视差滚动时回调函数，返回obj
 *          obj.top=视差元素头部位置，
 *          obj.height=视差元素高度,
 *          obj.scrollTop=窗口滚动条位置
 */
$.fn.parallax = function(options){
    var defaults = {
        proportion:0.3,
        start:0.5,
        expr:".parallaxImg",
        callback:false
    }
    var options = $.extend(defaults, options);
    this.each(function(){
        var _this=$(this);
        var _parallaxImg=_this.find(options.expr);
        var _img=_parallaxImg.find("img");
        var _win=$(window);
        var _winHeight=_win.height();
        _parallaxImg.css({"background-image":"url("+_img.attr("src")+")"})
        var _thisTop=_this.offset().top;
        var _distance=parseFloat(_parallaxImg.css("top"));
        var _place=_thisTop-_winHeight*options.start;
        var _height=_img.height();
        var isSetHeight=true;
        setHeight();
        _win.scroll(function(){
            var t=_win.scrollTop();
            if(t>_place){
                var _top=((t-_place)*options.proportion+_distance);
                _parallaxImg.css({"top":_top});
                if($.isFunction(options.callback)){
                    var o={};
                    o.scrollTop=t;
                    o.top=_thisTop+_top;
                    o.height=_height
                    options.callback(o);
                }
            }
        });
        function setHeight(){
            if(isSetHeight){
                var _height=_img.height();
                if(_height>0){
                    _parallaxImg.css("height",_height);
                    _img.hide();
                }else{
                    setTimeout(setHeight,300);
                }
            }
        }
    });
};

/*
 *   左右轮播
 *  speed:速度，默认1000ms
 *  time:间隔时间 默认5000, 不自动移动为0
 *  moveNumber:每次移动个数
 *  size:尺寸比例
 *  liWidth:li的宽度
 */
$.fn.custoersWheel = function(options) {
    var defaults = {
        speed: 400,
        time: 0,
        moveNumber: 1,
        size:false,
        liWidth:'li'
    }
    var options = $.extend(defaults, options);
    this.each(function() {
        var _this = $(this);
        var _butLeft = _this.find(".buttonLeft");
        var _butRight = _this.find(".buttonRight");
        var _div = _this.find(".imgList");
        var _windowWidth=_div.width();
        var _ul = _div.find("ul");
        var _list = _ul.find("li");
        var _len = _list.length;
        var _liWidth = getLiWidth();
        var _ulWidth = _liWidth * _len;
        var isClick=true;
        var isMove =_ulWidth<_windowWidth?false:true;
        _ul.width(_ulWidth);
        var trundle;
        if(options.time>0){
            trundle = setTimeout(function() {
                wheelGo(1)
            }, options.time);
        }
        _this.hover(
            function() {
                clearTimeout(trundle);
            },
            function() {
                if(options.time>0){
                    trundle = setTimeout(function() {
                        wheelGo(1)
                    }, options.time);
                }
            }
        );
        if(isMove){
            _butLeft.show();
            _butRight.show();
            _butLeft.click(function() {
                wheelGo(-1);
            });
            _butRight.click(function() {
                wheelGo(1);
            });
        }
        function wheelGo(d) {
            if(isMove && isClick){
                if(options.time>0){
                    clearTimeout(trundle);
                    trundle = setTimeout(function() {
                        wheelGo(1)
                    }, options.time+options.speed+50);
                }
                isClick=false;
                if(d==1){
                    _ul.stop().animate({"left": -_liWidth * options.moveNumber}, options.speed,function(){
                        var dom=_ul.find("li").slice(0,options.moveNumber);
                        _ul.append(dom);
                        _ul.css({"left":0});
                        isClick=true;
                    });
                }else{
                    var dom=_ul.find("li").slice(-options.moveNumber);
                    _ul.prepend(dom);
                    _ul.css({"left":-_liWidth * options.moveNumber});
                    _ul.stop().animate({"left": 0}, options.speed,function(){
                        isClick=true;
                    });
                }
            }
        }
        function getLiWidth(){
            var w=0;
            switch (options.liWidth){
                case "li":
                    w=_list.eq(0).outerWidth(true);
                    break;
                case 'window':
                    w=$(window).width();
                    break;
                case 'contents':
                    w=_windowWidth;
                    break;
            }
            if(options.size=="window" || options.size=="contents"){
                list.width(w);
                var h=w/(options.size);
                _this.height(h);
                _div.height(h);
                _list.height(h);
            }
            return w;
        };
    });
};


/*
 *   首页轮播
 *  speed:速度，默认600ms
 *  time:间隔时间 默认5000
 */
$.fn.indexWheel = function(options){
    var defaults = {
        speed:400,
        time:5000,
        isTextFade:true
    }

    var options = $.extend(defaults, options);
    this.each(function(){
        var _this=$(this);
        var _win=$(window);
        var _thisWidth=0;
        var _width=0;
        var _ul=_this.find(".contents");
        var _butLeft=_this.find(".butLeft");
        var _butRight=_this.find(".butRight");
        var sums=_this.find(".sums");
        var index = 0;
        var oIndex=0;
        var _list=_ul.children("li");
        var _img=_list.eq(0).find("img");
        var _len=_list.length;
        if(_len<2){
            return;
        }
        setSize();
        _ul.append(_list.clone());
        for(var i=0;i<_len;i++){
            var emStr='';
            if(i==0){
                emStr+='<em class="current">';
            }else{
                emStr+='<em>';
            }
            emStr+="</em>";
            sums.append(emStr);
        }
        if(options.time>0){
            var trundle=setTimeout(function(){
                oIndex=index;
                index++;
                wheelGo();
            },options.time);
        }
        sums.find("em").on("click",function(){
            oIndex=index;
            index=$(this).index();
            if(oIndex==0 && index==_len-1 && _len>2){
                index=-1;
            }
            wheelGo();
        });
        _this.hover(
            function(){
                if(options.time>0){
                    clearTimeout(trundle);
                }
            },
            function(){
                if(options.time>0){
                    trundle=setTimeout(function(){
                        oIndex=index;
                        index++;
                        wheelGo();
                    },options.time);
                }
            }
        );
        if(_butLeft.length>0){
            _butLeft.show();
            _butLeft.click(function(){
                toPrev();
            });
        }
        if(_butRight.length>0){
            _butRight.show();
            _butRight.click(function(){
                toNext();
            });
        }
        if($.isFunction(_this.swipeleft)){
            _this.swipeleft(function(){
                toNext();
            });
            _this.swiperight(function(){
                toPrev();
            });
        }
        function toNext(){
            oIndex=index;
            index++;
            wheelGo();
        }
        function toPrev(){
            oIndex=index;
            index--;
            wheelGo();
        }
        function wheelGo(){
            clearTimeout(trundle);
            if(index<0){
                var ull=parseInt(_ul.stop().css("left"));
                ull=ull>-_len*_width?-ull-_len*_width:ull;
                _ul.css({"left":ull});
                index=_len-1;
            }
            var l=index<oIndex-1?-(index+_len)*_width:-index*_width;
            if(index>=_len){
                index=0;
            }
            if(sums.length>0){
                sums.find("em").removeClass("current").eq(index).addClass("current");
            }
            if(options.isTextFade){
                _ul.find("li p").stop().animate({"opacity":0},50);
            }
            _ul.stop().animate({"left":l},options.speed,function(){
                _ul.css({"left":-index*_width});
                var _removeList=_ul.children("li").slice(_len)
                _removeList.remove();
                _ul.append(_list.clone());
                if(options.isTextFade){
                    _ul.find("li p").stop().animate({"opacity":1},options.speed/2);
                }

                if(options.time>0){
                    clearTimeout(trundle);
                    trundle=setTimeout(function(){
                        oIndex=index;
                        index++;
                        wheelGo();
                    },options.time);
                }
            });
        }
        function setSize(){
            _thisWidth=_this.width();
            _width=_thisWidth;
            _ul.css({"width":_width*_len*2+5});
        }
    });
};