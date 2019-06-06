module.exports = function SelectLike(sql,connection,callback){
  connection.query(sql, function (error, results,fields) {
    if (error) throw error;
    callback(results)
  });
}