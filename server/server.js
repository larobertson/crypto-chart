const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('./api.js');
const expressStaticGzip = require('express-static-gzip');
const app = express();

const port = process.env.PORT || 4000;
// app.use('/', express.static('dist'));
// app.use(
//   bodyParser.json({
//     strict: false
//   })
// );

app.use('/', expressStaticGzip('dist', {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
     res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}));


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

app.get('/bitDates', (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  request.getDates(from, to, (data) => {
    res.send(data)
  })
})



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
