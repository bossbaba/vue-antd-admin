//express_demo.js 文件
var express = require('express');
var app = express();
var insertDocument = require('./insertFunction.js')
var findDocumeent = require('./findFunction.js')
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
  // console.log(db)
  insertDocument (db,'mydb',[{name:"李四"}],(data)=>{
    console.log(data)
  })
  // 查数据 全部数据
  findDocumeent(db,'mydb',(data)=>{
    app.get('/api/all_data_mydb_table', function (req, res) {
      res.send(data);
    })
  });
  client.close();
});




var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})