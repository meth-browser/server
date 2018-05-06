const PouchDB = require('pouchdb')
const express = require('express')
const cors = require('cors')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const InMemPouchDB = PouchDB.defaults({
  db: require('memdown')
});

app.prepare()
  .then(() => {
    const server = express()

    server.use(cors({
      origin: true,
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 200
    }))

    server.use('/db', require('express-pouchdb')(InMemPouchDB, {
      logPath: '/tmp/meth-express-pouchdb.log',
      mode: 'minimumForPouchDB'
    }))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
