import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "shop",
});

connection.connect((err) => {
  if (err) {
    return console.error(`Error on connecting to the db: ${err.message}`);
  } else return console.log("Databse Connected!");
});

export default connection;
