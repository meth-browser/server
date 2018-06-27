const CronJob = require('cron').CronJob

const android = require('./android')
const ios = require('./ios')
const win = require('./win')
const mac = require('./mac')
const linux = require('./linux')

let lastUpdate

const check = () => {
  Promise.all([
    android.fetch(),
    ios.fetch(),
    win.fetch(),
    mac.fetch(),
    linux.fetch()
  ])
    .then(([ android, ios, win, mac, linux ]) => {
      lastUpdate = {
        android, ios, win, mac, linux
      }

      console.log('App update:')
      console.log(lastUpdate)
    })
    .catch(err => {
      console.error(err)
    })
}


module.exports = () => {
  // setup cron job to fetch latest version once per day
  check()
  new CronJob({
    cronTime: '0 0 0 * * *',
    onTick: check,
    start: true,
    timeZone: 'Europe/London'
  })

  return (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(lastUpdate))
    next()
  }
}
