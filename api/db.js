import mysql from 'mysql2/promise'

let pool = null

export async function getDb() {
  if (pool) return pool
  const url = process.env.DATABASE_URL
  if (!url) return null
  try {
    pool = mysql.createPool(url)
    await pool.execute('SELECT 1')
    return pool
  } catch { return null }
}
