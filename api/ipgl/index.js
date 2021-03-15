const axios = require('axios');

module.exports = async (req, res) => {
  let url = `https://geo.ipify.org/api/v1?apiKey=${process.env.IP_GL_API}`;
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      url += `&${key}=${req.query[key]}`;
    });
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
