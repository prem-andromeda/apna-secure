import { query } from "../../config/config";

export default async function handler(req, res) {
  try {
    const querySql = `SELECT otp_digit FROM otp_log WHERE mobile_no='${req.query.mobile_no}' order by timestamp DESC`;
    const valueParams = [];
    const data = await query({ query: querySql, values: [valueParams] });

    res.status(200).json(data);
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}
