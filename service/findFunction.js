/**
 * db - 数据库链接
 * tabbleName - 表名
 * callback - 回调函数 */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
findDocument = (db,tabbleName,callback) => {
  
  // console.log(db)
  
  const Collection = db.collection(tabbleName);
  // Find some documents
  Collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    callback(docs);
  });
}

module.exports = findDocument