const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('./api.js')
const app = express();

const port = process.env.PORT || 4000;
app.use('/', express.static('dist'));
app.use(
  bodyParser.json({
    strict: false
  })
);

app.get('/bitcoin', (req, res) => {
  request.getCurrent((data) => {
    res.send(data)
  });
})

app.get('/bitHistory', (req, res) => {
  request.getHistory((data) => {
    res.send(data)
  })
})



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
