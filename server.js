const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const apiKey = '4cddgujrg_j3rtnnemn_s61kze2vk'; // Replace with your actual API key


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
//https://branch-d2-c-auto-english.vercel.app

const corsOptions = {
  origin: 'https://branch-d2-c-auto-english.vercel.app', // Replace with your frontend domain
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/liscense', cors(corsOptions), (req, res) => {
  const plateNumber = req.query.plate;
  const state = req.query.state;

  const url = `https://api.carsxe.com/platedecoder?key=${apiKey}&plate=${plateNumber}&state=${state}&format=json`;

  axios.get(url)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while decoding the license plate.');
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));