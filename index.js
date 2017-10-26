const express = require('express')
const app = express()
const server = require('http').createServer(app)

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile('public/index.html')
})

server.listen(8000, () => console.log('listening on 8000'))
