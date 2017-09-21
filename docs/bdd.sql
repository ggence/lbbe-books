sudo -i -u postgres
createdb LBBE_books
psql LBBE_books


CREATE ROLE philippon;
ALTER ROLE "philippon" WITH LOGIN;



DROP TABLE livre;


CREATE TABLE livre (
    ID_livre        int primary key,
    ISBN            varchar(80),
    titre           varchar(80),
    premier_auteur  varchar(80),
    resume          varchar(200),
    emplacement     varchar(80)         -- numero_bureau
);


DROP TABLE personne;
 CREATE TABLE personne (
    id_emprunteur  varchar(25) primary key,
    nom            varchar(25),
    prenom         varchar(25),
    mail           varchar(80),
    bureau         int
 );


DROP TABLE emprunt;
CREATE TABLE emprunt (
    ID_livre     int references livre,
    id_emprunteur  varchar(80) references personne
 );


INSERT INTO personne (id_emprunteur, nom, prenom, mail, bureau)
    VALUES ('HelPhilippon','Philippon','Heloise','heloise.philippon@univ-lyon1.fr','211');

INSERT INTO personne (id_emprunteur, nom, prenom, mail, bureau)
    VALUES ('GuiGence','Gence','Guillaume','guillaume.gence@univ-lyon1.fr','200');

SELECT * FROM personne;



 INSERT INTO livre (ID_livre, ISBN, titre, premier_auteur, emplacement)
    VALUES (1, '978-2-7011-4273-9', 'Classification phylogenetique du vivant. Tome 1', 'G. Lecointre', 211);

 INSERT INTO livre (ID_livre, ISBN, titre, premier_auteur, emplacement)
    VALUES (2, '978-2-7011-3456-7', 'Classification phylogenetique du vivant. Tome 2', 'G. Lecointre', 211);

 INSERT INTO livre (ID_livre, ISBN, titre, premier_auteur, emplacement)
    VALUES (3, '978-1-4471-4750-3', 'Computational Cancer Biology. An Interaction Network Approach', 'M. Vidyasagar', 211);

INSERT INTO livre (ID_livre, ISBN, titre, premier_auteur, emplacement)
    VALUES (4, 'XXX-X-XXX-X', 'Toto arrive au LBBE', 'H. Philippon', 0);

INSERT INTO emprunt VALUES (1,'HelPhilippon');
INSERT INTO emprunt VALUES (2,'HelPhilippon');
INSERT INTO emprunt VALUES (3,'GuiGence');
SELECT * FROM emprunt;

### lister tous les livres empruntes par un utilisateur
SELECT * FROM emprunt
    WHERE id_emprunteur='HelPhilippon';

### Lister les livres empruntes avec leur titre and co
SELECT *
    FROM livre, emprunt
    WHERE livre.id_livre = emprunt.id_livre;

### trouver le mail de l emprunteur du livre que l on cherche
SELECT mail
	FROM personne
	INNER JOIN emprunt USING(id_emprunteur)
	INNER JOIN livre USING(id_livre)
	WHERE emprunt.id_livre = 3 ;

### desemprunter un livre
DELETE FROM emprunt WHERE id_livre = 2;

