const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

// TODO(you): Update the contents of privateSettings accordingly, as you did
// in HW5, then uncomment this line.
const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet, as you did in HW5, then uncomment these lines.
const SPREADSHEET_ID = '1S-FFj8XdOdImL6Peg2NusooWCV8xgZ0y9jx-tFus2VY';
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

// TODO(you): Add at least 1 GET route and 1 POST route.
async function onSearch(req, res) {
  const key = req.params.word;
  const result = await sheet.getRows();
  const rows = result.rows;

  let newArray = [];
  const labels = rows[0];

  for(let index = 1; index < rows.length; index++) {
    let newElement = {};
    for(let label = 0; label < labels.length; label++) {
      newElement[labels[label]] = rows[index][label];
    }
    newArray.push(newElement);
  }

  let index = -1;
  for(let place=0; place<newArray.length; place++) {
    const choice = newArray[place];
    const keys = Object.keys(choice);
    for(const id of keys) {
      if(choice[id] === key || choice[id] === key) {
        index = place;
        break;
      }
    }
  }

  let favorite = null;
  if(index !== -1) {
    favorite = newArray[index];
  }
  res.json(favorite);
}
app.get('/find/:word', onSearch);

async function onPost(req, res) {
  const messageBody = req.body;
  const keys = Object.keys(messageBody);

  let newEntry = [];
  for(const key of keys) {
    newEntry.push(messageBody[key]);
  }

  let addEntry = await sheet.appendRow(newEntry);
  res.json(addEntry);
}
app.post('/add', jsonParser, onPost);

// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
