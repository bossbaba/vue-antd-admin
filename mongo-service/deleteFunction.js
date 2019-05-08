/**
 * db - 数据库链接
 * tabbleName - 表名
 * callback - 回调函数 */
const assert = require('assert');

const removeDocument = function(db, tabbleName,deleteData,callback) {
  // Get the documents collection
  const collection = db.collection(tabbleName);
  async function getData () {
    await findOneDocument(db,tabbleName,(data)=>{
      console.log(data,'>>>>>>>.r')
      return data[0]
    },deleteData._id)
  }
  // Delete document where a is 3
  collection.deleteOne(getData(), function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
}

module.exports = removeDocument