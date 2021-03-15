const axios = require('axios');

module.exports = async (req, res) => {
  const { id, zoomLevel, tiles } = req.query;
  const url = `https://api.mapbox.com/styles/v1/${id}/tiles/${zoomLevel}/${tiles[0]}/${tiles[1]}?access_token=${process.env.MB_API}`;

  try {
    const results = await axios.get(url, { responseType: 'arraybuffer' });

    if (results.status === 200) {
      res.setHeader('Content-Type', results.headers['content-type']);
      res.setHeader('Content-Length', results.headers['content-length']);
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
