var mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    allowPublicKeyRetrieval: true,
    connectionLimit: 5});

async function request(sql, data=[]) {
  let connect;
  try {

	connect = await pool.getConnection();
	const rows = await connect.query(sql, data);
  return rows;
  

  } catch (err) {
	throw err;
  } finally {
	if (connect) connect.release(); 
  console.log("connected");//release to pool
  }
}

async function getData(sql, data=[]){
    const answer = await request(sql, data);
    delete answer.meta;
    return answer;
}

async function getOne(sql, data=[]){
    const answer = await getData(sql, data);
    return answer[0];
}

module.exports.request = request;
module.exports.getData = getData;
module.exports.getOne = getOne;