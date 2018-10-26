//子菜单
$(document).on("mouseenter",".nav_left li,.nav_right li",function(){
    var _this=$(this);
    _this.find(".submenu").stop(false,true).fadeIn(200);

});
$(document).on("mouseleave",".nav_left li,.nav_right li",function(){
    var _this=$(this);
    _this.find(".submenu").stop(false,true).fadeOut(200);

});
$(document).on("mouseenter",".submenu dt",function(){
    var _this=$(this);
    var _index=_this.index();
    _this.addClass("on").siblings("dt").removeClass("on");
    _this.siblings("dd").removeClass("on").eq(_index).addClass("on");
});


//商品放大镜


//购物车

(function () {
    var sum=1;
    var num=$(".chooseAmount input");
    var price=$("dd .price");
    var total=$("dd li span.totalPrices em");
    var add=$(".add").on("click",function () {
        sum++;
        num.val(sum);
        total.html(`${sum *1000}`);
    });
    var minus=$(".minus").on("click",function(){
        sum--;
        num.val(sum);
        if(sum<1){
            sum=1;
            return num.val(1);
        }
        total.html(` ${sum *1000}`);
    })
})()


//购物车删除商品
  var dels=$(".dels");
  var list=$(".tableList");
  var empty=$(".empty")
    dels.on("click",function () {
        console.log(dels);
        list.remove();
        empty.removeClass("hide")
    })



//刷新购物车
function cartAmountShow(){
    $.post(
        ajaxIndexUrl+"/getCartSum",
        function(data){
            if(data){
                if(data.sum>0){
                    $(".cartAmount").html(data.sum).fadeIn(300);
                }else{
                    $(".cartAmount").html("").fadeOut(3);
                }
            }
        },"json"
    );
}

//查看购物车
$(document).on("mouseenter",".cart",function(){
    var _this=$(this);
    cartAmountShow();
    if(_this.hasClass("on")){
        return;
    }
    _this.addClass("on");
    $(".cart").remove();
    var _box=$('<div class="popCartBox"></div>').appendTo(_this);
    _box.fadeIn(100);
    var _cart=$('<div class="popCart"></div>').appendTo(_box);
    var _load=$('<div class="loading"></div>').appendTo(_cart);
    $.post(
        ajaxIndexUrl+"/getCartData",
        function(data){
            if(data){
                if(data.count<1){
                    var _info=$('<div class="info">购物车是空的</div>').appendTo(_cart);
                    _load.fadeOut(200);
                }else{
                    var _list=data.list;
                    var _len=_list.length;
                    var proList=$('<div class="proList"></div>').appendTo(_cart);
                    var _proListUl=$('<ul></ul>').appendTo(proList);
                    for(var i=0;i<_len;i++){
                        var obj=_list[i];
                        var str='';
                        str+='<li data-id="'+obj.pro_id+'" data-type="'+obj.pro_type+'" data-size="'+obj.size_id+'" data-material="'+obj.material_id+'" data-main="'+obj.main_id+'">';
                        switch (obj.pro_type){
                            case "diamond":
                                str+='<div class="imgs"><img src="'+IMG_PREFIX+obj.pro.video.img+'"></div>';
                                str+='<div class="texts">';
                                str+='<h3>'+obj.pro.title+'<strong>*'+obj.amount+'个</strong></h3>';
                                str+='<p>';
                                str+='<span>'+obj.pro.weight+'克拉</span>';
                                str+='<span>'+obj.pro.cut.short+'</span>';
                                str+='<span>'+obj.pro.color.title+'</span>';
                                str+='<span>'+obj.pro.clarity.short+'</span>';
                                str+='</p>';
                                str+='</div>';
                                break;
                            case "design":
                                str+='<div class="imgs"><img src="'+IMG_PREFIX+obj.pro.cover+'"></div>';
                                str+='<div class="texts">';
                                str+='<h3>'+obj.pro.title+'<strong>*'+obj.amount+'个</strong></h3>';
                                str+='<p>';
                                str+='<span>'+obj.material.title+'</span>';
                                str+='<span>尺寸：'+obj.size.title+'</span>';
                                str+='</p>';
                                str+='</div>';
                                break;
                            case "fashion":
                                str+='<div class="imgs"><img src="'+IMG_PREFIX+obj.pro.cover+'"></div>';
                                str+='<div class="texts">';
                                str+='<h3>'+obj.pro.title+'<strong>*'+obj.amount+'个</strong></h3>';
                                str+='<p>';
                                str+='<span>'+obj.material.title+'</span>';
                                str+='<span>'+obj.main.weight+'克拉</span>';
                                str+='<span>尺寸：'+obj.size.title+'</span>';
                                str+='</p>';
                                str+='</div>';
                                break;
                            case "jewelry":
                                str+='<div class="imgs"><img src="'+IMG_PREFIX+obj.pro.cover+'"></div>';
                                str+='<div class="texts">';
                                str+='<h3>'+obj.pro.title+'<strong>*'+obj.amount+'个</strong></h3>';
                                str+='<p>';
                                str+='<span>'+obj.material.title+'</span>';
                                str+='<span>'+obj.main.weight+'克拉</span>';
                                str+='<span>尺寸：'+obj.size.title+'</span>';
                                str+='</p>';
                                str+='</div>';
                                break;
                        }
                        str+='<a href="javascript:void(0)" class="delCart">×</a>';
                        str+='</li>';
                        _proListUl.append(str);
                    }
                    var _h4=$('<h4></h4>').appendTo(_cart);
                    _h4.append('<strong>共 '+data.count+' 件商品</strong>');
                    if(data.count>1){
                        var _showAll=$('<a href="javascript:void(0)" class="showAll">查看所有商品</a>').appendTo(_h4);
                        _showAll.on("click",function(){
                            _proListUl.find("li").show();
                            _showAll.hide();
                        });
                    }
                    _proListUl.find(".delCart").on("click",function(){
                        var _delCartLi=$(this).parent();
                        var _proId=_delCartLi.data("id");
                        var _proType=_delCartLi.data("type");
                        var _proSize=_delCartLi.data("size");
                        var _proMaterial=_delCartLi.data("material");
                        $.post(
                            ajaxIndexUrl+"/delCartPro",
                            {proId:_proId,type:_proType,material:_proMaterial,size:_proSize},
                            function(json){
                                if(json){
                                    if(json.status==1){
                                        _this.removeClass("on");
                                        $(".headCartBox").trigger("mouseenter");
                                    }else{
                                        _delCartLi.msg({msg:json.msg})
                                    }
                                }else{
                                    _delCartLi.msg({msg:"数据错误"})
                                }
                            },"json"
                        )
                    });
                    var _h6=$('<h6></h6>').appendTo(_cart);
                    _h6.append('<strong>结算：&yen;<em>'+data.total.toFixed(2)+'</em>元</strong>');
                    _h6.append('<a href="'+memberUrl+"/cart"+'">立即结算</a>')
                    _load.fadeOut(200);
                }
            }else{
                var _info=$('<div class="info">数据错误，请检查网络</div>').appendTo(_cart);
                _load.fadeOut(200);
            }
        },"json"
    );
});
$(document).on("mouseleave",".headCartBox",function(){
    var _this=$(this);
    var _box=$(".popCartBox");
    _box.stop(true,true).fadeOut(100,function(){
        _box.remove();
        _this.removeClass("on");
    });
});
$(document).on("click",".subscribeSubmit",function(){
    var _this=$(this);
    if(_this.hasClass("on")){
        _this.msg({msg:"请不要重复提交哦"});
        return;
    }
    _this.addClass("on");
    var _email= $("input[name='subscribe']");
    var _val=_email.val();
    if($.isEmpty(_val)){
        _email.msg({msg:"请输入邮箱"});
        return false;
    }
    if($.isEmail(_val)){
        _email.msg({msg:"邮箱格式错误"});
        return false;
    }
    _email.msg({msg:"正在提交数据，请稍候..."});
    $.post(
        ajaxIndexUrl+"/addSubscribe",
        {email:_val},
        function(data){
            if(data){
                if(data.status==0){
                    _this.removeClass("on");
                }
                $.msg({msg:data.msg});
            }else{
                _this.removeClass("on");
                $.msg({msg:"请检查网络"});
            }
        },"json"
    )
});








