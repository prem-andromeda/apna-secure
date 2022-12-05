import { query } from "../../config/config";

export default async function handler(req, res) {
  try {
    const values = [req.body];
    const querySql = `INSERT INTO apna_secure (name,city,product,mobile_no,email) VALUES (?,?,?,?,?)`;
    const valueParams = Object.values(values[0]);
    console.log(valueParams);
    const data = await query({ query: querySql, values: valueParams });

    res.status(200).json({ products: data });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}
