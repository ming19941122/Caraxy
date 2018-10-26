const express=require('express');
const bodyParser=require('body-parser');
const user=require('./routes/user.js');
const product=require('./routes/product.js');
//1.使用express构建web服务器
var app=express();
app.listen(3030);
//2.托管静态资源
app.use(express.static('./myPro'));
//配置body-parser
app.use(bodyParser.urlencoded({
	extended:false
}));
//3.使用路由器管理所有用户模块下的路由
// 挂载到user 下     /user/add
app.use('/user',user);
app.use('/product',product);
//商品路由器挂载到product下   /product/add
//app.use('/product',product);
 

