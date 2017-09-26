jQuery(function ($) {
    // action sur le bouton search de la ligne isbn du formulaire de la page ajouter_Livre
    $("#search_isbn").click(function(e) {
        var url = "searchISBN"; // the script where you handle the form input.
        // RAZ du formulaire
        $( "input[name='titre']" ).val('');
        $( "input[name='auteurs']" ).val('');
        $( "textarea[name='resume']" ).val('');
        $( "input[name='position']" ).val('');
        $( "select[name='proprietaire']" ).val('null');

        // lancement de la recherche du livre avec l'ISBN saisi
        $.ajax({
            type: "POST",
            url: url,
            data:"isbn="+$( "input[name='isbn']" ).val(),
            dataType: "json",
            success: function (livre) {
                $( "input[name='titre']" ).val( livre.title );
                $( "input[name='auteurs']" ).val( livre.authors );
                $( "textarea[name='resume']" ).val( livre.description );
            },
            error: function (resultat, statut, erreur) {
                alert(resultat.responseJSON);
            }
        });
    });
  });