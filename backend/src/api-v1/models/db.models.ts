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
