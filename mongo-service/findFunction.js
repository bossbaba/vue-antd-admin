/**
 * db - 数据库链接
 * tabbleName - 表名
 * callback - 回调函数 */
const assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
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