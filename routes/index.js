var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LBBE-Books' });
});
router.get('/EmprunterRendre', function(req, res, next) {
  res.render('EmprunterRendre', { title: 'Emprunter et Rendre' });
});
router.post('/Emprunter', function(requete, res, next) {
  console.log("L'utilisateur "+ requete.body.emprunteur, "a emprunte" +requete.body.livre);
  res.render('index', { title: 'Emprunter '+requete.body.livre ,msg: requete.body.livre });
});

module.exports = router;
