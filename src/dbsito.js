import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'mysql',
    user: 'admincerrito',
    password: 'dbcerritoccp',
    database: 'padronccp',
})