
 CREATE TABLE personne (
    id_emprunteur  SERIAL primary key,
    nom            varchar(80),
    prenom         varchar(80),
    contact        text
 );



CREATE TABLE livre (
    id_livre        SERIAL primary key,
    isbn            varchar(15),
    titre           varchar(80),
    auteurs         varchar(300),
    resume          text,
    id_proprietaire    int references personne,
    emplacement     varchar(100)         -- numero_bureau
);


CREATE TABLE emprunt (
    id_livre       int references livre,
    id_emprunteur  int references personne,
    date_emprunt   date
 );
