const axios = require('axios');
const { getClientIp } = require('@supercharge/request-ip');

module.exports = async (req, res) => {
  let url = `https://geo.ipify.org/api/v1?apiKey=${process.env.IP_GL_API}`;
  if (req.query.domain) {
    url += `&domain=${req.query.domain}`;
  } else if (req.query.ipAddress) {
    url += `&ipAddress=${req.query.ipAddress}`;
  } else {
    const ip = getIp(req);
    url += `&ipAddress=${ip}`;
  }

  try {
    const results = await axios.get(url);

    if (results.status === 200) {
      res.send(results.data);
    } else {
      res.status(results.status);
      res.json({ error: 'An error has occurred' });
    }
  } catch (err) {
    console.log(err);
    res.status(err.response.status);
    res.json({ error: 'An error has occurred' });
  }
};

function getIp(req) {
  let ip = getClientIp(req);
  if (ip.indexOf(':') > -1) {
    let reversed = ip.split('').reverse().join('');
    reversed = reversed.substr(0, reversed.indexOf(':'));
    ip = reversed.split('').reverse().join('');
  }
  return ip;
}
