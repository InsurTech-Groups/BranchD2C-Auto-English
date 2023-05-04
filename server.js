const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Started Server Branch + ITG Auto')
});

app.post('/branch', async (req, res) => {

  try {
    const formData = req.body;

    console.log('backend formData', formData);

    const response = await axios.post('https://link-generator-v2.api.ourbranch.com', formData, { //TODO: Add API URL
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'bI0nf695ilIZBijR0vAOfqdKvxB5gd5yYtJdvpwY2NtyjkASKKluFfkagl3xc8RA',
      }
    });
    res.send(response.data);
    console.log('response', response.data);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));