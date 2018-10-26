SET NAMES UTF8;
DROP DATABASE IF EXISTS Caraxy;
CREATE DATABASE Caraxy CHARSET=UTF8;
USE Caraxy；
 #网站基本信息表
 CREATE TABLE Caraxy_Product(
 	id INT PRIMARY KEY AUTO_INCREMENT,
 	name VARCHAR(255),
 	price DECIMAL(10,2) ,
    introduce VARCHAR(255),
    pic   VARCHAR(255),
    herf  VARCHAR(255)
 )

 INSERT INTO Caraxy_Product VALUES(null,'旋舞',6000,'继承四爪镶嵌的闪烁与牢固，戒臂镶嵌了半圈小钻，令这枚钻石更加奢华独特','./img/ring-1.img','fashion.html?id=1');
  INSERT INTO Caraxy_Product VALUES(null,'圆形光环培育钻戒',5950,'继承四爪镶嵌的闪烁与牢固，戒臂镶嵌了半圈小钻，令这枚钻石更加奢华独特','./img/ring-1.img','fashion.html?id=2');
   INSERT INTO Caraxy_Product VALUES(null,'守护',4900,'继承四爪镶嵌的闪烁与牢固，戒臂镶嵌了半圈小钻，令这枚钻石更加奢华独特','./img/ring-1.img','fashion.html?id=3');

   CREATE TABLE Caraxy_user(
    	uid INT PRIMARY KEY AUTO_INCREMENT,
    	user VARCHAR(255),
        email VARCHAR(255),
        pwd   VARCHAR(255),
    )
