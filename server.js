const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <form method="POST">
      <textarea name="user_input" rows="5" cols="50"></textarea><br>
      <button type="submit">Ask</button>
    </form>
  `);
});

app.post('/', async (req, res) => {
  const userInput = req.body.user_input;

  const response = await axios.post(
    'https://api-inference.huggingface.co/models/gpt2',
    { inputs: userInput },
    {
      headers: { Authorization: 'Bearer YOUR_HF_API_KEY' },
    }
  );

  const generated = response.data[0].generated_text;
  res.send(`
    <p><strong>Input:</strong> ${userInput}</p>
    <p><strong>AI Response:</strong> ${generated}</p>
    <a href="/">Go Back</a>
  `);
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));
