const mysql=require('mysql');
//连接mysql数据库的模块
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'caraxy',
	connectionLimit:10
});

module.exports=pool;