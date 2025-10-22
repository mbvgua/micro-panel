import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { sqlConfigOptions } from "../api-v1/models/db.models";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Create the connection pool. The pool-specific settings are the defaults
const sqlConfig: sqlConfigOptions = {
  //NOTE: the 'host' variable is not passed in the backend.env, instead it will
  // be passed in the docker-compose.yaml .env, allowing the container to connect
  // either on the localhost or from the docker container if need be
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

export const pool = mysql.createPool(sqlConfig);
