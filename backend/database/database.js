import pg from "pg";

export const database = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "sistema",
  password: "12345",
  port: 5432,
});
