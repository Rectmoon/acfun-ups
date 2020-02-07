const axios = require('axios')
const cheerio = require('cheerio')
const backgroundImageRegex = /https?:\/\/(?<ref_value>[^>]+?)([.\w\s\/]+)/gi

async function spideAvatarAndName(url) {
  try {
    const { data: html } = await axios.get(url)
    const $ = cheerio.load(html)
    const anchorMes = $('#anchorMes')
    const avatar = anchorMes
      .find('.img')
      .css('background')
      .match(backgroundImageRegex)[0]

    const name = anchorMes.find('.name').text()
    return [name, avatar]
  } catch (e) {
    console.log('Something went wrong: ' + e)
  }
}

module.exports = { spideAvatarAndName }
