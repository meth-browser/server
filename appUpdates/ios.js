const { fetchMobileAppVersion } = require('./utils')

const APP_ID = '1330319781'
const UPDATE_URL = `https://itunes.apple.com/us/app/coinstocks/id${APP_ID}`

exports.fetch = async () => ({
  updateUrl: UPDATE_URL,
  version: await fetchMobileAppVersion('ios', APP_ID)
})
