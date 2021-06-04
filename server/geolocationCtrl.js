const axios = require("axios");

function getCoords(req, res) {
  axios
    .get("https://freegeoip.app/json/")
    .then((result) => {
      return res.status(result.status).json(result.data).end();
    })
    .catch((err) => {      
      return res.status(500).json(err).end();
    });
}

module.exports = {
  getCoords,
};
