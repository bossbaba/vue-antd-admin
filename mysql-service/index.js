const mysql = require('mysql');                   //引入mysql插件
const config = require('./mysqlConfig')           //引入数据库配置
const SelectAll = require('./QueryFunction')      //引入查询所有数据函数
const Insert = require('./InsertFunction')        //插入数据函数
const Updata = require('./UpdataFunction')        //更新数据函数
const Delete = require('./DeleteFunction')        //删除数据函数
const SlecteLike = require('./QueryFuntionLike')  //引入查询函数
const express = require('express')                //引入express模块
var app = express();                              //创建运用
const fs = require('fs')
var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


// 1laoyanying.
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
// 模糊查询
app.get('/api/yesterdayaddcount', (req, res) => {
  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  const curDate = new Date();
  const preDate = (new Date(curDate.getTime() - 24 * 60 * 60 * 1000)).toLocaleDateString(); //前一天
  const twoDate = (new Date(curDate.getTime() - 2 * 24 * 60 * 60 * 1000)).toLocaleDateString(); //前二天
  const threeDate = (new Date(curDate.getTime() - 3 * 24 * 60 * 60 * 1000)).toLocaleDateString(); //前三天
  const foreDate = (new Date(curDate.getTime() - 4 * 24 * 60 * 60 * 1000)).toLocaleDateString(); //前四天
  const fiveDate = (new Date(curDate.getTime() - 5 * 24 * 60 * 60 * 1000)).toLocaleDateString(); //前五天
  const dataArr = []
  let LikeSql = `SELECT count(id) AS count from tab_user_admin where regtime like '%${preDate}%'`
  let LikeSql_o = `SELECT count(id) AS count from tab_user_admin where regtime like '%${twoDate}%'`
  let LikeSql_t = `SELECT count(id) AS count from tab_user_admin where regtime like '%${threeDate}%'`
  let LikeSql_th = `SELECT count(id) AS count from tab_user_admin where regtime like '%${foreDate}%'`
  let LikeSql_f = `SELECT count(id) AS count from tab_user_admin where regtime like '%${fiveDate}%'`
  SlecteLike(LikeSql_f, connection, (data) => {
    dataArr.push({
      count: data[0].count,
      time: fiveDate
    })
  });
  SlecteLike(LikeSql_th, connection, (data) => {
    dataArr.push({
      count: data[0].count,
      time: foreDate
    })
  });
  SlecteLike(LikeSql_t, connection, (data) => {
    dataArr.push({
      count: data[0].count,
      time: threeDate
    })
  });
  // 
  SlecteLike(LikeSql_o, connection, (data) => {
    dataArr.push({
      count: data[0].count,
      time: twoDate
    })
  });
  SlecteLike(LikeSql, connection, (data) => {
    dataArr.push({
      count: data[0].count,
      time: preDate
    })
  });
  setTimeout(() => {
    res.send(JSON.stringify({
      data: dataArr
    }))
  }, 1000)
  connection.end()
})
// 插入一条数据
app.get('/api/adduser', (req, res) => {
  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  let regtime = (new Date()).toLocaleString()
  const InsertSql = `INSERT INTO tab_user_admin (name,age,nickname,regtime) VALUES ("mrdotyan",22,"zs","${regtime}")`;
  Insert(InsertSql, connection, (data) => {
    res.send(JSON.stringify({
      code: data.insertId
    }))
  })
  connection.end()
})

// 更新一条数据
app.get('/api/updatauser', (req, res) => {
  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  let updata = req.query
  const UpdataSql = `UPDATE tab_user_admin set name='${updata.name}',age='${updata.age}',nickname='${updata.nickname}' where id = ${updata.id}`;
  Updata(UpdataSql, connection, (data) => {
    res.send(JSON.stringify({
      code: data.affectedRows,
      message: data.changedRows
    }))
  })
  connection.end()
})

// 删除一条数据
app.get('/api/deleteuser', (req, res) => {

  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  let query = req.query
  const DeleteSql = `delete from tab_user_admin where id = ${query.id}`
  Delete(DeleteSql, connection, (data) => {
    res.send(JSON.stringify({
      data: data
    }))
  })
  connection.end()
})

// 添加文章
app.post('/api/addarcticle', (req, res) => {
  let path = './art/'
  let artcTimename = new Date().getTime() + '.html'
  let content = req.body.content
  const connection = mysql.createConnection(config);//创建链接
  connection.connect();     //打开链接
  fs.exists("art", function (exists) {
    if (!exists) {
      fs.mkdirSync(path, (err) => {
        if (err) {
          console.log('出错')
          return
        }
      })
    }
    
    fs.writeFileSync(path + artcTimename,content , (err) => {
      if (err) {
        console.log('出错')
        return
      }
    })
  });
  let dataDB = {
    time:(new Date()).toLocaleString(),
    htmlpath:path + artcTimename
  }
  // tab_artcile
  const InsertSql = `INSERT INTO tab_artcile (path,time) VALUES ('${dataDB.htmlpath}','${dataDB.time}')`;
  Insert(InsertSql, connection, (data) => {
    res.send(JSON.stringify({
      code: data.insertId
    }))
  })
  connection.end()
})
// 请求文章 知道文章编号
app.post('./api/getarcticle',(req,res)=>{
  
})
const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})