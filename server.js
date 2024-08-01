import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

API_ENDPOINT = env.process.API_ENDPOINT;
CLIENT_ID = env.process.CLIENT_ID;
CLIENT_SECRET = env.process.CLIENT_SECRET;
REDIRECT_URI = env.process.REDIRECT_URI;

async function exchangeCode(code) {
  const data = new URLSearchParams({
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': REDIRECT_URI
  });

  const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    },
    body: data
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}
function getData(token) {
  return fetch(`${API_ENDPOINT}/users/@me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}


app.get('/api/login/:code', async (req, res) => {
    const code = req.params.code;
    exchangeCode(code)
        .then(result => {
            const token = result.access_token;
            getData(token)
                .then(response => response.json())
                .then(data =>  {
                    data.date = new Date();
                    data.expires_in = result.expires_in;
                    data.token = token;
                    res.json(data);
                })
                .catch(err => res.status(500).json({ error: err.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
app.get('/api/user/:token', (req, res) => {
    const token = req.params.token;
    getData(token)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});