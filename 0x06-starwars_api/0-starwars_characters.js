#!/usr/bin/node


const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.error('Please provide a movie ID as the first argument');
  process.exit(1);
}

const apiUrl = `https://swapi.dev/api/films/${movieId}`;

request(apiUrl, { json: true }, (err, res, body) => {
  if (err) {
    console.error('Error occurred while fetching movie data', err);
    process.exit(1);
  }

  if (res.statusCode !== 200) {
    console.error(`Unexpected response status code: ${res.statusCode}`);
    process.exit(1);
  }

  body.characters.forEach((charUrl) => {
    request(charUrl, { json: true }, (err, res, charData) => {
      if (err) {
        console.error(`Error occurred while fetching character data for ${charUrl}`, err);
        return;
      }

      if (res.statusCode !== 200) {
        console.error(`Unexpected response status code while fetching character data for ${charUrl}: ${res.statusCode}`);
        return;
      }

      console.log(charData.name);
    });
  });
});
