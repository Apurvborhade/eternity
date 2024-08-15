import pkg from 'pg'

const { Pool } = pkg
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eternity',
    password: 'abcpb5429p',
    port: 5432,
});




export default pool;