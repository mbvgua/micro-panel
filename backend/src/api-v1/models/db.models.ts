export interface sqlConfigOptions {
  host: string;
  user?: string;
  password?: string;
  database?: string;
  waitForConnections: boolean;
  connectionLimit: number;
  maxIdle: number;
  idleTimeout: number;
  queueLimit: number;
  enableKeepAlive: boolean;
  keepAliveInitialDelay: number;
}

export interface sqlError {
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}
