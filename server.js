// External libraries
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const compression = require('compression');
const helmet = require('helmet');

// Express instance
const app = express();

// Load Middlwares
app.use(helmet());
app.use(compression());

const redirectUri = process.env.REDIRECT_URI || 'http://localhost:41000/callback'

// Register routes
// Spotify login
app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: redirectUri,
    }));
});

// Spotify callback
app.get('/callback', function(req, res) {
  const { code } = req.query || null;
  // Configurate auth options
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  // Auth request to spotify
  request.post(authOptions, function(err, response, body) {
    const userAccessToken = body.access_token
    // Redirect for web server
    res.redirect(`${process.env.FRONTEND_URI || 'http://localhost:3000'}?access_token=${userAccessToken}`);
  });
});

module.exports = app;
