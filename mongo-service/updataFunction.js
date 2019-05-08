/**
 * db - 数据库链接
 * tabbleName - 表名
 * callback - 回调函数 */

const assert = require('assert');
const findOneDocument = require('./findOneFunction.js')

updateDocument = (db,tabbleName,updateData,callback) => {
  const collection = db.collection(tabbleName);
  async function getData () {
    await findOneDocument(db,tabbleName,(data)=>{
      console.log(data,'>>>>>>>.r')
      return data[0]
    },updateData._id)
  }
  collection.updateOne( getData (), { $set: {
    name:updateData.name,
    age:updateData.age,
    regsiterTime:updateData.regsiterTime,
    email:updateData.email,
    phone:updateData.phone
  } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

module.exports = updateDocument

// updateDocument