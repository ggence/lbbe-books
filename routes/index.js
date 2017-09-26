var express = require('express');
var router = express.Router();
var isbn = require('node-isbn');
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
  res.render('ErreurEmprunterRendre', { title:'La restitution de '+requete.body.livre + ' a echoue' });
  //res.render('Rendre', {livre: requete.body.livre });
});
/* GET page ajouter livre */
router.get('/ajouterLivre', function(req, res, next) {
  // recuperer ici les proprietaires ds la bdd (utilisation de la methode adequat du module interragitBDD  var proprietaires =  interrogation_bdd.getListUtilisateurs();
  // var proprietaires =  interrogation_bdd.getListUtilisateurs();
  var proprietaires = [];
  res.render('ajouterLivre', { title: 'LBBE-Books ajouter un livre', liste_proprietaires: proprietaires });
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
