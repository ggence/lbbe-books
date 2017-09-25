# LBBE-Books

Référencer les livres du LBBE pour plus d'accessibilité

# SCHEMA
[ICI](https://github.com/ggence/lbbe-books/blob/master/docs/FullSizeRender.jpg?raw=true)

# TODO-LIST

- Voir https://github.com/ggence/lbbe-books/issues

# CONTRIBUTIONS
Pour contribuer vous devez d'abord avoir créer un compte github et etre membre de projet. Pour cela il faut m'envoyer votre identifiant github. puis accepter l'invitation: https://github.com/ggence/lbbe-books/invitations (lorsque je l'ai faite).

A ce moment je vous assigne une tache que vous pouvez voir dans https://github.com/ggence/lbbe-books/issues.
Si vous ne comprenez pas la tache (issue) n'hésitez pas à poser des questions sur le fil de question lié à la tâche.

# CONVENTION DE DEVELOPPEMENT
Chaque tache doit etre developper dans une branche à vous qui a un nom en lien avec la tache (ex: postEmpruntLivre).
Vous devez pull (fetch + merge) depuis master pour vous tenir à jour des modifications depuis master.
Lorsque vous avez terminé une tache, vous pouvez pouvez me prévenir (en utilisant par exemple le boutton New Pull Request) de la page d'accueil du projet.
ATTENTION: Vous n'avez pas le droit d'écrire dans Master Ou une branche que vous n'avez pas crée.

# Exemple
## Exemple git developpeur:
```shell
$git clone https://github.com/ggence/lbbe-books
$git checkout -b "postEmpruntLivre2"
$git status
```
*Je fais des modifs*
```shell
$git diff
$git status
$git add mes_fichiers
$git commit -m "j'ai fais des modifs"
$git push
```

## Exemple git intégrateur (administrateur du projet):
```shell
$git fetch origin
$git checkout postEmpruntLivre2
$git rebase master
#Gestion des conflits potentiels par l'administrateur
$git checkout master
$git merge --no--ff postEmpruntLivre2 # --no-ff permet de garder l'historique d'une création de branche
```



