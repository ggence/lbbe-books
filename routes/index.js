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

  // Ici une requete

  //une promesse qui fait la requete, qui renvoie sur une page bilan en cas de succes et vers une page d'erreur sinon

  res.render('EmpruntOK', { title:requete.body.emprunteur+ ' a emprunte '+requete.body.livre ,livre: requete.body.livre,emprunteur: requete.body.emprunteur });
});

module.exports = router;
