var express = require('express');
var router = express.Router();
// const InteragitBDD = require('InteragitBDD');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LBBE-Books' });
});


/* Add a book to the DB. */
router.post('/AjouterLivre', function (req, res) {
  var ISBN = req.body.ISBN;
  var titre_livre= req.body.titre;
  // console.log(titre_livre);
  var auteurs = req.body.auteurs;
  var resume = req.body.resume;
  var emplacement = req.body.emplacement;
  var id_proprietaire = req.body.id_proprietaire;
  // InteragitBDD.Add1Livre( titre_livre , auteurs, id_proprietaire ,emplacement, ISBN, resume);
  res.render('ValidationLivreAjoute',{title: 'contact' , titre_livre:titre_livre}); // render et pas sendFile car utilisation d un moteur de rendu
});


router.post('/Emprunter', function(requete, res, next) {
  console.log("L'utilisateur "+ requete.body.emprunteur, "a emprunte " +requete.body.livre);

  // Ici une requete
  //
  //une promesse qui fait la requete, qui renvoie sur une page bilan en cas de succes et vers une page d'erreur sinon
  res.render('ErreurEmprunterRendre', { title:requete.body.emprunteur+ ' a echoue a emprunter '+requete.body.livre  });
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
