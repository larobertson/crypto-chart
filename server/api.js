const request = require('request')
const rp = require('request-promise')

const getCurrent = (cb) => {
  rp('https://api.coindesk.com/v1/bpi/currentprice.json')
  .then((response) => cb(response))
  .catch((err) => console.log('we have a problem getting current data from API: ', err))
}

const getHistory = (cb) => {
  rp('https://api.coindesk.com/v1/bpi/historical/close.json?index=USD')
  .then((res) => cb(res))
  .catch((err) => console.log('error getting history from API: ', err))
}

const getDates = (start, end, cb) => {
  rp(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
  .then((res) => cb(res))
  .catch((err) => console.log('error getting prices for these dates', err))
}

module.exports = {
  getCurrent,
  getHistory,
  getDates
}