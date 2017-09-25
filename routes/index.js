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


module.exports = router;
