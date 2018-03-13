const crypto = require('crypto')

const toMD5 = object => crypto.createHash('md5').update(JSON.stringify(object)).digest('hex')

module.exports = ({
  timeout = (/* 1 h */ 1 * 60 * 60 * 1000),
  maxEntries = 100,
  name = 'cache',
  log = console.log, // eslint-disable-line no-console
} = {}) => {
  const cache = {}

  const purge = () => {
    // timeout
    const keysTimeout = Object
      .entries(cache)
      .map(([key, store]) => ((store.date + timeout) > Date.now() ? undefined : key))
      .filter(Boolean)
    if (keysTimeout.length > 0) {
      log(`[cache](${name}) timeout keys: [${keysTimeout}]`)
      keysTimeout.forEach((key) => { delete cache[key] })
    }

    // max entries
    const entries = Object.entries(cache)
    if (entries.length <= maxEntries) return
    entries.sort((a, b) => a[1].date < b[1].date)
    const keysMaxEntries = entries
      .filter((val, index) => index >= maxEntries)
      .map(([key]) => key)
    if (keysMaxEntries.length > 0) {
      log(`[cache](${name}) max entries keys: [${keysMaxEntries}]`)
      keysMaxEntries.forEach((key) => { delete cache[key] })
    }
  }

  const add = (key, value) => {
    purge()

    cache[toMD5(key)] = {
      value,
      date: Date.now(),
    }

    return value
  }

  const get = (key) => {
    purge()

    const found = cache[toMD5(key)]
    if (!found) return undefined

    return found.value
  }

  return {
    get,
    add,
  }
}
