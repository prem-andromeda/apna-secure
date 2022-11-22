import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "test",
    port: 3306,
    user: "root",
    password: "Andro@123",
  });
  try {
    const query = `SELECT otp_digit FROM otp_log WHERE mobile_no='${req.query.mobile_no}' order by timestamp DESC`;
    const values = [];
    const [data] = await dbconnection.execute(query, values);
    dbconnection.end();

    res.status(200).json(data);
    console.log(req.query.ip);
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}
