const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 8080

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Gestione di tutte le richieste con Next.js
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})