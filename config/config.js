import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
