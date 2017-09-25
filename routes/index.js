var express = require('express');
var router = express.Router();
var isbn = require('node-isbn');

//var interrogation_bdd = require('../lib/InteragitBDD');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LBBE-Books' });
});

/* GET page ajouter livre */
router.get('/ajouterLivre', function(req, res, next) {
  // recuperer ici les proprietaires ds la bdd (utilisation de la methode adequat du module interragitBDD  var proprietaires =  interrogation_bdd.getListUtilisateurs();
  //var proprietaires =  interrogation_bdd.getListUtilisateurs();
  //res.render('ajouterLivre', { title: 'LBBE-Books ajouter un livre', liste_proprietaires: proprietaires });
});

/* POST search ISBN*/
router.post('/searchISBN', function(req, res, next) { 
  var isbn_livre=req.body.isbn;
  isbn.resolve(isbn_livre, function (err, book) {
    // il faut ameliorer ici la gestion de l'erreur voir dans la donc node-isbn
    if (err) {
      res.status(444).json('Pas de livre trouvé avec cet ISBN');
    } else {
      res.json(book);
    }
  });
});

module.exports = router;
