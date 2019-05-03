//express_demo.js 文件
var express = require('express');
var app = express();
var insertDocument = require('./insertFunction.js')
var findDocumeent = require('./findFunction.js')
var findOneDocument = require('./findOneFunction.js')
var updateDocument = require('./updataFunction.js')
var removeDocument = require('./deleteFunction.js')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// 数据名字
const dbName = 'mydb';
// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  // 插入数据
  // insertDocument(db, 'user_tab', [{ name: "mrdotyan", age: 18, regsiterTime: (new Date()).toLocaleString(), email: '2564217790@qq.com', phone: "15025138973" }], (data) => {
  //   console.log(data)
  // })
  // 查数据 全部数据
  findDocumeent(db, 'user_tab', (data) => {
    app.get('/api/userinfo', function (req, res) {
      res.send(data);
    })
  });
  // 查数据，查单个数据
  findOneDocument(db, 'user_tab', (data) => {
    console.log(data)
  }, '5ccbb5b9806c3d4554996ed1')
  // 修改数据
  updateDocument (db,'user_tab',{
    _id:"5ccbb5b9806c3d4554996ed1",
    name:"mrdotyan",
    age:80,
    regsiterTime:"2019-5-3 11:30:01",
    email:"2564217790@qq.com",
    phone:"15025138973"
  },(data)=>{
    console.log(data.result.n)
    
    console.log(data.result.ok)
  })
  // 删除数据
  removeDocument (db,'user_tab',{
    _id:"5ccc3e10cd37313c5c2f9399",
    name:"mrdotyan",
    age:18,
    regsiterTime:"2019-5-3 11:30:01",
    email:"2564217790@qq.com",
    phone:"15025138973"
  },(data)=>{
    console.log(data.result.n)
    
    console.log(data.result.ok)
  })
  client.close();
});




var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})