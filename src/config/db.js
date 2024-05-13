import mysql from "mysql2";

const sqlConnection = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connection = mysql.createConnection(sqlConnection);

connection.connect((err) => {
  if (err) {
    console.error(`Error on connecting to the db: ${err.message}`);
    process.exit(1);
  } else return console.log("Databse Connected!");
});

export default connection;
