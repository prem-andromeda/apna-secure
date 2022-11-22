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
    const values = [req.body];
    console.log(Object.values(values[0]));
    const query = `INSERT INTO apna_secure (name,city,product,mobile_no,email) VALUES (?,?,?,?,?)`;
    const [data] = await dbconnection.execute(query, Object.values(values[0]));
    dbconnection.end();

    res.status(200).json({ response: true });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message, response: false });
  }
}
