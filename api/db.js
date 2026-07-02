import mysql from 'mysql2/promise'

let pool = null

export async function getDb() {
  if (pool) return pool
  const url = process.env.DATABASE_URL
  if (!url) return null
  try {
    const parsed = new URL(url)
    pool = mysql.createPool({
      host: parsed.hostname,
      port: parseInt(parsed.port || '3306', 10),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ''),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    })
    await pool.execute('SELECT 1')
    return pool
  } catch { return null }
}
