# Oauth Spotify
This service allows the user logs in to spotify and redirects the user to a given frontend application with a valida access_token as a parameter in the url.

## Start server
In order to initialize the oauth server, first register the spotify application here:
https://developer.spotify.com/my-applications

On that page, add http://localhost:40000 as a callback url.

Write the below commands in your terminal.

```
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
npm start
```

Then go to http://localhost:40000/login in your browser. This will initiate the login flow and finally redirect to http://localhost:3000?access_token=ZZZZZ where ZZZZZ is a valid access token that you can use to do operations in the Spotify API.

