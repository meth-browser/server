const { fetchMobileAppVersion } = require('./utils')

const APP_ID = 'com.hiddentao.coinstocks.mobile.app'
const UPDATE_URL = `https://play.google.com/store/apps/details?id=${APP_ID}.app`

exports.fetch = async () => ({
  updateUrl: UPDATE_URL,
  version: await fetchMobileAppVersion('android', APP_ID)
})
