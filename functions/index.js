const { logger } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const axios = require('axios');
require("firebase-functions/logger/compat");

initializeApp();


exports.get_trip_advisor_info = onCall({cors: true}, async (req) => {
  try {
    const param = {
      key: process.env.TRIPADVISOR_API_KEY,
      searchQuery: req.query.searchQuery,
      latLong: req.query.latLong,
      language: 'en',
    };
    const res = await axios.get('https://api.content.tripadvisor.com/api/v1/location/search', {params: param});
    logger.log('test fuck')
    console.log('test fuck')
    logger.info('result', {quote: res});

    return res.data;
  } catch (error) {
    return error;
  }  
});