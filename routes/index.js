var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'LBBE-zob', user: 'toto' });
});

/* GET creerCompte. */
router.get('/creerCompte', function(req, res, next) {
  res.render('creerCompte');
});

router.post('/creerCompte', function(requete, res) {
  res.render('index', { title: 'LBBE-zob', msg: requete.body.nom});
});



module.exports = router;

