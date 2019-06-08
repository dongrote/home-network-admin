var express = require('express');
var router = express.Router();

router.patch('/toggle', (req, res) => {
  res.sendStatus(501);
});

router.get('/status', (req, res, next) => {
  res.sendStatus(501);
});

module.exports = router;
