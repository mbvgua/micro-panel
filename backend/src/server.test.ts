import supertest from "supertest";

import app from "./app";
import { pool } from "./config/db.config";
import { ResultSetHeader } from "mysql2";

const request = supertest(app);

describe("[main server tests]", () => {
  it("should ensure server is running", async () => {
    expect(request).toBeDefined();
  });

  it("should ensure that the application connects to the database", async () => {
    const [rows]: any = await pool.query("SELECT 1+1 as results;");
    expect(rows[0]).toMatchObject({
      results: 2,
    });
  });

  it("should ensure 'micro_panel' db is created", async () => {
    const [rows] = await pool.query<ResultSetHeader>("USE micro_panel;");
    expect(rows).toBeDefined();
    expect(rows.warningStatus).toEqual(0);
  });
});
