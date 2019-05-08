const mysql = require('mysql');               //引入mysql插件
const config = require('./mysqlConfig')       //引入数据库配置
const SelectAll = require('./QueryFunction')  //引入查询所有数据函数
const Insert = require('./InsertFunction')    //插入数据函数
const Updata = require('./UpdataFunction')    //更新数据函数
const Delete = require('./DeleteFunction')    //删除数据函数

const express = require('express')             //引入express模块
var app = express();                              //创建运用


// 允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})
// 查询所有数据

app.get('/api/alluser', (req, res) => {
  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  SelectAll(connection, 'tab_user_admin', (data) => {
    res.end(JSON.stringify({
      data
    }))
  });
  connection.end()
})

// 插入一条数据
app.get('/api/adduser', (req, res) => {
  // const connection = mysql.createConnection(config);//创建链接
  // connection.connect();     //打开链接
  console.log(req, res)
  // const InsertSql = 'INSERT INTO tab_user_admin (name,age,nickname) VALUES ("mrdotyan",22,"zs")';
  // Insert(InsertSql, connection, (data) => {
  //   console.log(data)
  // })
  // connection.end()
})

// 更新一条数据
app.get('/api/updatauser', (req, res) => {
  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  console.log(req, res)
  const UpdataSql = 'UPDATE tab_user_admin set name= "zhangsan" where id = 10';
  Updata(UpdataSql,connection,(data)=>{ 
    console.log(data)
  })
  connection.end()
})

// 删除一条数据
app.get('/api/deleteuser', (req, res) => {
  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  console.log(req, res)
  const DeleteSql = 'delete from tab_user_admin where id = 40'
  Delete(DeleteSql,connection,(data)=>{
    console.log(data)
  })
  connection.end()
})



const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})