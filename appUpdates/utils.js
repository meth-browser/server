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
exports.fetchDesktopReleaseDetails = () => {
  if (_fetchPromise) {
    return _fetchPromise
  }

  _fetchPromise = got('https://api.github.com/repos/ethereum/mist/releases/latest')
    .then(({ body }) => {
      delete _fetchPromise

      return {
        version: JSON.parse(body).tag_name,
        updateUrl: 'https://meth.app/download'
      }
    })
    .catch(err => {
      delete _fetchPromise

      console.error(err)

      throw new Error('Failed to fetch desktop release details')
    })

  return _fetchPromise
}
