var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LBBE-Books' });
});
router.get('/EmprunterRendre', function(req, res, next) {
  res.render('EmprunterRendre', { title: 'Emprunter et Rendre' });
});

module.exports = router;
