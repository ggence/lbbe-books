var express = require('express');
var router = express.Router();
//var bdd = require('InteragitBDD');

/* =============================================================
partie bidon en attendant le developpement de l'API BDD */

/* definition d'une classe livre */
function Livre(id, isbn, titre, auteurs, id_proprietaire, emplacement, empruntStatus) {
    this.id = id;
    this.isbn = isbn;
    this.titre = titre;
    this.auteurs = auteurs;
    this.id_proprietaire = id_proprietaire;
    this.emplacement = emplacement;
    this.empruntStatus = empruntStatus;
}

/*instanciation de livre */
var livre1 = new Livre(1, "132321321312", "Toto à la plage", "Hugo V", 4, "dtc", false);
var livre2 = new Livre(2, "98746468987", "Toto à la montagne", "Zola E", 4, "dtc", true);
var livre3 = new Livre(3, "1337", "Toto à la ferme de calcul", "Delmotte S", 12, "Omega", false);

/* constructiuon d'un tableau de livres */
var listeLivres = [];
listeLivres.push(livre1, livre2, livre3);
//console.log(listeLivres);

// ============================================================== */

/* GET home page. */
router.get('/', function(req, res, next) {
    //var livres=bdd.getListeLivres();
    res.render('index', { title: 'LBBE-Books', liste: listeLivres });
});

router.get('/ajouterLivre', function(req, res, next) {
    //var livres=bdd.getListeLivres();
    res.render('ajouterlivre', { title: 'LBBE-Books' });
});
module.exports = router;