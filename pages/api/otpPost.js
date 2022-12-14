import { query } from "../../config/config";

export default async function handler(req, res) {
  try {
    const values = [req.body];
    const querySql = `INSERT INTO otp_log (otp_digit,mobile_no) VALUES (?,?)`;
    const valueParams = Object.values(values[0]);
    console.log(valueParams);
    const data = await query({ query: querySql, values: valueParams });

    res.status(200).json({ response: true });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}
