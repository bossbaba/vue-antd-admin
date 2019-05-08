module.exports = function SelectAll(connection,table,callback){
  const SelectSql = `select * from ${table}`
  let allData = ''
  connection.query(SelectSql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  });
}