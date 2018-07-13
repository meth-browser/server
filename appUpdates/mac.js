const { fetchDesktopReleaseDetails } = require('./utils')

exports.fetch = async () => fetchDesktopReleaseDetails('.dmg')
