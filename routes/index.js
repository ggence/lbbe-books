var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LBBE-Books' });
});

/* GET page ajouter livre */
router.get('/ajouterLivre', function(req, res, next) {
  res.render('ajouterLivre', { title: 'LBBE-Books ajouter un livre' });
});



module.exports = router;
