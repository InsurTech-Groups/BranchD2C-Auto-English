const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.listen(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Started Server Branch + ITG Auto')
});

app.post('/branch', async (req, res) => {

  try {

    const formData = req.body;

    console.log('backend formData', formData);

    const response = await axios.post('', formData, { //TODO: Add API URL
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '' //TODO: Add API KEY
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