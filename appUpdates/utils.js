const got = require('got')
const basicAuthHeader = require('basic-authorization-header')

const appMonstaRequestHeaders = {
  Authorization: basicAuthHeader('ae9e46309b7a948abd628dceecee93c09201c1c1', 'X')
}

exports.fetchMobileAppVersion = async (os, appId) => {
  let url
  if ('android' === os) {
    url = `https://api.appmonsta.com/v1/stores/android/details/${appId}.json?country=US`
  } else {
    url = `https://api.appmonsta.com/v1/stores/itunes/details/${appId}.json?country=US`
  }

  try {
    const { body } = await got(url, { headers: appMonstaRequestHeaders })
    return JSON.parse(body).version
  } catch (err) {
    console.error(err)

    throw new Error(`Failed to fetch ${store} version`)
  }
}

let _fetchPromise = null
exports.fetchDesktopReleaseDetails = assetFileExtension => {
  if (!_fetchPromise) {
    _fetchPromise = got('https://api.github.com/repos/ethereum/mist/releases/latest')
  }

  return _fetchPromise
    .then(({ body }) => {
      delete _fetchPromise

      const data = JSON.parse(body)

      // if not found
      if (!data.tag_name) {
        throw new Error('No release found')
      }

      const asset = data.assets.find(({ browser_download_url: url }) => (
        url.endsWith(assetFileExtension)
      ))

      if (!asset) {
        throw new Error('No matching asset found')
      }

      return {
        version: data.tag_name,
        updateUrl: asset.browser_download_url
      }
    })
    .catch(err => {
      delete _fetchPromise

      console.error(err)

      throw new Error('Failed to fetch desktop release details')
    })
}
