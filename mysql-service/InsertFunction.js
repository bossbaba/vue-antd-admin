module.exports = (sql,connection,callback) =>{
connection.query(sql,function (error, results) {
  if (error) throw error;
  callback(results)
});
}