const express=require('express');
const pool=require('../pool.js');//导入连接数据库的模块

var router=express.Router();
//添加请求方法为post,url为add的路由

 router.get('/fashion',(req,res)=>{
    var {id}=req.query;
    var sql=`SELECT * FROM caraxy_product where id=?`;
    pool.query(sql,[id],(err,result)=>{
       if (err) throw err;
       res.send(result);
    })
 });

//导出路由器
module.exports=router;