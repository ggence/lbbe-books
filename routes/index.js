var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LBBE-Books' });
});




router.post('/Emprunter', function(requete, res, next) {
  console.log("L'utilisateur "+ requete.body.emprunteur, "a emprunte " +requete.body.livre);

  // Ici une requete
  //
  //une promesse qui fait la requete, qui renvoie sur une page bilan en cas de succes et vers une page d'erreur sinon
  res.render('ErreurEmprunterRendre', { title:requete.body.emprunteur+ ' a echoue a emprunte '+requete.body.livre  });
  //res.render('Emprunter', { title:requete.body.emprunteur+ ' a emprunte '+requete.body.livre ,livre: requete.body.livre,emprunteur: requete.body.emprunteur });
});

router.post('/Rendre', function(requete, res, next) {
  console.log("Le livre " +requete.body.livre + "est rendu");

  // Ici une requete
  //
  //une promesse qui fait la requete, qui renvoie sur une page bilan en cas de succes et vers une page d'erreur sinon
  res.render('ErreurEmprunterRendre', { title:'La restitiion de '+requete.body.livre + ' a echoue' });
  //res.render('Rendre', {livre: requete.body.livre });
});

module.exports = router;
