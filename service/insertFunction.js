/**
 * db - 数据库链接
 * tabbleName - 表名
 * insertData - 需要插入的数据必须是数组对象
 * callback - 回调函数 */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
insertDocument = (db,tabbleName,insertData,callback) => {
  
  // console.log(db)
  
  const Collection = db.collection(tabbleName);
  // Find some documents
  Collection.insertMany(insertData,(err,result)=>{
    assert.equal(err,null)
    console.error(err)
    callback(result);
  })
}

module.exports = insertDocument