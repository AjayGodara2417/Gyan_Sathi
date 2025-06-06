// lib/db.ts
import mysql from "mysql2/promise";
// import fs from "fs";
// import path from "path";

const {
  aiven_HOST,
  aiven_PORT,
  aiven_USER,
  aiven_PASSWORD,
  aiven_NAME,
  aiven_SSL_CA_PATH
} = process.env;

if (!aiven_HOST || !aiven_USER || !aiven_PASSWORD || !aiven_NAME || !aiven_SSL_CA_PATH || !aiven_PORT) {
  throw new Error("Missing required database environment variables.");
}

export const db = await mysql.createConnection({
  host: aiven_HOST,
  port: parseInt(aiven_PORT),
  user: aiven_USER,
  password: aiven_PASSWORD,
  database: aiven_NAME,
  ssl: {
    ca: process.env.AIVEN_SSL_CA
  }
});
