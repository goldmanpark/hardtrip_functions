const { logger } = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const axios = require('axios');

initializeApp();

exports.get_trip_advisor_info = onRequest({ cors: true }, async (req, res) => {
  try {
    const apiResponse = await axios.get('https://api.content.tripadvisor.com/api/v1/location/search', {
      params: {
        key: process.env.TRIPADVISOR_API_KEY,
        searchQuery: req.query.searchQuery,
        latLong: `${req.query.lat},${req.query.lng}`,
        language: 'en',
      },
    });

    res.set('Access-Control-Allow-Origin', '*');
    res.json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.test = onCall({ cors: true }, (data) => {
  return 'fuck'
})