import express from 'express';
import dotenv from 'dotenv';
import { Level } from 'level';
// import cors from 'cors';
const app = express();
// app.use(cors());
dotenv.config();

const db = new Level('usersDB' , { valueEncoding: 'json' });


const API_ENDPOINT = process.env.API_ENDPOINT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

async function exchangeCode(code) {
    return new Promise((resolve, reject) => {
        const data = new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI
        });
        fetch(`${API_ENDPOINT}/oauth2/token`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                reject(new Error(data.error));
            }
            resolve(data);
        })
        .catch(err => {throw new Error(err.message)});
    })
}
function getData(customToken, isToken = false) {
  return new Promise((resolve, reject) => {
        fetch(`${API_ENDPOINT}/oauth2/@me`, {
            headers: {
                'Authorization': `Bearer ${customToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(err => reject(err));
    });
}
async function refreshToken(refresh_token) {
    const data = new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
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

    return response.json();
    }


app.get('*', (req, res, next) => {
    //log les requêtes
    console.log(req.url);
    next();
});

app.get('/api/relogin/:token', async (req, res) => {
    const customToken = req.params.token;
    getData(customToken)
        .then(data => {
            refreshToken(data.refresh_token)
                .then(result => {
                    const token = result.access_token;
                    getData(token, true)
                        .then(response => response.json())
                        .then(data => {
                            data.token = customToken;
                            data.expires_in = result.expires_in;
                            res.json(data);
                            data.date = new Date().toISOString();
                            data.token = token;
                            data.refresh_token = result.refresh_token;
                            db.put(customToken, data);
                        })
                        .catch(err => res.status(500).json({ error: err.message }));
                })
                .catch(err => res.status(500).json({ error: err.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

app.get('/api/login/:code', async (req, res) => {
    const code = req.params.code;
    exchangeCode(code)
        .then(result => {
            console.log(result);    
            const token = result.access_token;
            getData(token, true)
                .then(response => response.json())
                .then(data =>  {
                    const customToken = Math.random().toString(36).substring(7);
                    data.token = customToken
                    data.expires_in = result.expires_in;
                    res.json(data);
                    console.log("sending data");
                    data.date = new Date().toISOString();
                    data.token = token;
                    data.refresh_token = result.refresh_token;
                    db.put(customToken, data);                    
                })
                .catch(err => res.status(500).json({ error: err.message, at : "getData" }));
        })
        .catch(err => res.status(500).json({ error: err.message, at:"exchangeCode" }));
});
app.get('/api/user/:token', (req, res) => {
    const token = req.params.token;
    getData(token, true)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
})
app.get('*', (req, res) => {
    let urlModif = req.url
    const musiqueListe = [
        "<a href='https://www.youtube.com/watch?v=tF6CKxc_2JQ'>fish de YonKaGor</a>, tu connais ?, IKAN IKAN IKAN IKAN IKAN RASA RASA RASA RASANYA",
        "<a href='https://www.youtube.com/watch?v=BK3BxASoMJc'>Good Morning, Mr. Sunfish! de YonKaGor</a>, IL Y A UN POISSON CHAT DANS LA MER",
        "<a href='https://www.youtube.com/watch?v=Na0w3Mz46GA'>Lofi Hip Hop Radio - Beats to Relax/Study to</a>, je me sens relaxé",
        "<a href='https://www.youtube.com/watch?v=xcNFyPciZ0g'>嗚呼、素晴らしきニャン生 / Nem feat. GUMI＆鏡音レン</a>, nyanyanyanyanyanyanya!",
        "<a href='https://www.youtube.com/watch?v=BF9KaMMfoCc'>【初音ミク】 cat's dance 【オリジナル】</a>, C'est une chanson de chat",
    ];

    //selectione des caractaire ALÉATOIRE ET RENPLACE PAR D'AUTRE
    for (let i = 0; i < urlModif.length; i++) {
        let isReplace = Math.floor(Math.random() * 100) < 20 ? true : false;
        if (isReplace) {
            let newChar = String.fromCharCode(Math.floor(Math.random() * 255));
            urlModif = urlModif.substring(0, i) + newChar + urlModif.substring(i + 1);
        }
    }
    res.status(404).send('je n\'entends pas, tu as dit "' + urlModif+'" ?, je suis désolé, mais je ne comprends pas ce que tu veux dire, j\'étais en train d\'écouter de la musique 🎧, en ce moment c\'est ' + musiqueListe[Math.round(Math.random()*(musiqueListe.length-1))])

});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});