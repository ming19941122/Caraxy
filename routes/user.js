const express=require('express');
const pool=require('../pool.js');//导入连接数据库的模块
//路由器
	var router=express.Router();
	//添加请求方法为post,url为add的路由
router.post('/add',(req,res)=>{
	var obj=req.body;
	console.log(obj);
	// res.send('OK');
	//对客户端所传递的数据进行验证
	var $uname=obj.user;
    console.log($uname);
	// if(!$uname){// $uname==''
	// 	res.send({code:401,msg:'uname required'});
	// //禁止程序继续进行
	// return;
	// }
	//对密码验证，邮箱，手机进行验证
	 var $upwd=obj.pwd;
	// if(!$upwd){
	// 	res.send({code:402,msg:'upwd required'});
	// //禁止程序继续进行
	// return;
	// }
	//
	var $email=obj.email;
	// if(!$email){
	// 	res.send({code:403,msg:'email required'});
	// //禁止程序继续进行
	// return;
	// }

	//把数据插入到数据库中
	var sql='INSERT INTO caraxy_user VALUES(NULL,?,?,?)';
	pool.query(sql,[$uname,$email,$upwd],(err,result)=>{
		if(err) throw err;
		//提示注册成功
		res.send({code:200,msg:'register suc'});
	})

});
//2.用户的登录
router.post('/login',(req,res)=>{
	var obj=req.body;
	var $uname=obj.user;
	if(!$uname){
		res.send({code:401,msg:'user required'});
	return;
	}
	var $upwd=obj.pwd;
	if(!$upwd){
		res.send({code:402,msg:'pwd required'});
	//禁止程序继续进行
	return;
	}
	var sql='SELECT * FROM caraxy_user WHERE user=? AND pwd=?'
	console.log($uname,$upwd)
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(result)
		//如果数组的长度大于0，说明找到满足条件的记录
		//否则数组的长度等于0，说明没有找到满足条件的记录
		if(result.length>0){
			res.send({code:200,msg:'login suc'});
		}else{
			res.send({code:301,msg:'user of pwd error'})
		}
		console.log(result)
	})
	
});
//3.删除用户
router.get('/delete',(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	console.log(obj);
	if(!$uid){
 		res.send({code:401,msg:'uid required'});
 	return;
 	} 
	var sql='DELETE FROM xz_user WHERE uid=?' 
	pool.query(sql,$uid,(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'})
		}else{
			res.send({code:301,msg:'delete fail'})
		}
	});
});

//4.检索用户
router.post('/search',(req,res)=>{
	var obj=req.body;
	var $uid=obj.uid;
	console.log(obj);
 	if(!$uid){
 		res.send({code:401,msg:'uid required'});
		return;
 	}
	var sql='SELECT * FROM xz_user WHERE uid=?';
	pool.query(sql,$uid,(err,result)=>{
		if(err) throw err;
		console.log(result)
 		if(result.length>0){
 			res.send(result[0])
 		}else{
 			res.send({code:301,msg:'can not find'})
 		}
	});
});

//5.用户修改（post）：编号（uid），姓名（user_name），性别（gender），邮箱（email），电话（phone）
//url：/update
router.post('/update',(req,res)=>{
	var obj=req.body;
	var $uid=obj.uid;
	if(!$uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
	var $user_name=obj.user_name;
	if(!$user_name){
		res.send({code:402,msg:'user_name required'});
		return;
	}
	var $gender=obj.gender;
	if(!$gender){
		res.send({code:403,msg:'gender required'});
		return;
	}
	var $email=obj.email;
	if(!$email){
		res.send({code:404,msg:'email required'});
		return;
	}
	var $phone=obj.phone;
	if(!$phone){
		res.send({code:405,msg:'phone required'});
		return;
	}
//构建sql语句
    var sql='UPDATE xz_user SET user_name=?,gender=?,email=?,phone=? WHERE uid=?'
	pool.query(sql,[$user_name,$gender,$email,$phone,$uid],(err,result)=>{
		if(err)throw err;
		//判断affectedRows，如果值大于0，有更新
		if(result.affectedRows>0){
			res.send({code:200,msg:'update success'})
		}else{
			res.send({code:301,msg:'update error '})
		}
	});	
});
//6.分页查询
router.get('/list',(req,res)=>{
	var obj=req.query;
	var size=parseInt(obj.size);
	var page=parseInt(obj.page);
	//如果为空，设置一个默认值
	if(!size){
		size=2;	
	}
	if(!page){
		page=1;	
	}
	var begin=((page-1)*size);
	
	var sql='SELECT * FROM xz_user LIMIT ?,?'
	
	pool.query(sql,[begin,size],(err,result)=>{
	if(result.length>0){
	if(err)throw err;
		res.send(result);
	}else{
			res.send({code:301,msg:'list error '})
		}
	});	
	
})




//导出路由器
module.exports=router;




























