$(function () {
    $(`<link rel="stylesheet" href="../css/header.css">`).appendTo("head");
    $.ajax({
        url: "header.html",
        type:"get",
        success:function(res) {
            $(res).replaceAll("#header");
            // 登录
            var loginBox = $("#login_box");
            var loginBj = $(".loginBoxBj");
            var toLogin = $(".login");
            var closeLogin = $(".closeLogin")
            toLogin.on("click", function () {
                loginBox.css("display", "block");
                loginBj.css("display", "block")
            });
            closeLogin.on("click", function () {
                loginBox.css("display", "none");
                loginBj.css("display", "none")
            });
            //登录
            var _tologin = $(".tologin");
            _tologin.click(function () {
                var user = $(".uesr input").val();
                var pwd = $(".upwd input").val();
                $.ajax({
                    url: "http://localhost:3030/user/login/",
                    type: "post",
                    // 将用户数据传递进ajax参数
                    data: {
                        user,
                        pwd
                    },
                    success: function (res) {
                        console.log(res.code)
                            if(res.code==200){

                                alert("登录成功");
                                location.href = 'index_main.html';
                            } else{
                                alert("账号密码错误")
                            }
                        }
                });
            });
            //注册
            var _toregister = $(".submits")
            console.log(_toregister)
            _toregister.click(function () {
                console.log("123")
                var user = $(".user input").val();
                var email = $(".email input").val();
                var pwd = $(".pwd input").val();
                var cpwd = $(".cpwd input").val();
                var userreg=/^1[34578]\d{9}$/
                var emailreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var pwdreg = /^[A-Za-z0-9\.\-\_]{8,16}$/;

            var yz = 0;
            if (!userreg.test(user)) {
                alert("请输入正确的手机号")
                yz += 1
            }
            if (!pwdreg.test(pwd)) {
                alert("密码格式不正确,请输入8-16位")
                yz += 1
            }
            if (!emailreg.test(email)) {
                alert("邮箱格式不正确")
                yz += 1
            }
            if(!(pwd===cpwd)){
                alert("您输入的密码不一致");
                yz += 1
            }
            if (yz == 0) {
                $.ajax({
                    url: "http://localhost:3030/user/add",
                    type: "post",
                    data: {
                        user: user,
                        pwd: pwd,
                        email: email
                    },
                    success: function () {
                        alert("注册成功")
                    }
                })
            }
            });
            //
            var _bjHead=$(".bjHead");
            var _header=$(".header_box");
            var _indexVideo=$(".indexVideo");
            $(window).scroll(function(){
                var _top=$(this).scrollTop();
                _bjHead.css({"top":-_top*0.5});
                _indexVideo.css({"top":-_top*0.5});

                if(_top>400){
                    if(!_header.hasClass("headerFixed")){
                        _header.css({"top":-130});
                        setTimeout(function(){
                            _header.addClass(" headerFixed").css({"top":0});
                        },100)
                    }
                }else{
                    if(_header.hasClass("headerFixed")){
                        _header.css({"top":-130});
                        setTimeout(function(){
                            _header.removeClass("headerFixed").css({"top":0});
                        },100)

                    }
                }
            });
        }
    })

})