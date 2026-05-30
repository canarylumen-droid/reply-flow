import express from 'express'
import path from 'path'

const app = express()
const port = process.env.PORT || 3000
const distDir = path.join(process.cwd(), 'dist')

// Serve static files
app.use(express.static(distDir))

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Static server running on port ${port}, serving ${distDir}`)
})
