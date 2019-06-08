var express = require('express');
var router = express.Router();
var request = require('request-promise');
const {PIHOLE_URI} = process.env;

router.patch('/toggle', (req, res) => {
  return request.get({uri: `${PIHOLE_URI}/admin/list.php`, json: true})
    .then(response => {
      res.sendStatus(501);
    })
    .catch(next);
});

router.get('/status', (req, res, next) => {
  res.sendStatus(501);
});

module.exports = router;
