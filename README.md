# Project n°6 - OpenClassrooms #
### Construisez une API sécurisée pour une application d'avis gastronomiques: Piquante ###

### Prérequis: ###
- [NodeJS] en version v14.16.1
- [Angular CLI] en version 12.1.0
- [node-sass](https://www.npmjs.com/package/node-sass): attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.

### Guide d'utilisation: ###

Etapes à suivre pour la bonne utilisation de l'application en local:

1. Cloner le repository depuis GitHub.
2. Ouvrir le projet avec Visual Studio Code.
3. Ouvrir 2 terminaux.

Pour la partie front-end:
1. Accéder au dossier frontend avec la commande `cd frontend`.
2. Lancer les commandes suivantes:
==> `npm install`
==> `npm start`
==> `ng serve`

Pour la partie back-end:
1. Accéder au dossier backend avec la commande `cd backend`.
2. Lancer les commandes suivantes:
==> `npm install`
==> `nodemon server`
3. Créer un fichier de configuration `.env` avec les informations suivantes:
`DB_ADMIN =` Ajouter ce que vous souhaitez comme nom utilisateur.
`DB_PASS =` Ajouter ce que vous souhaitez comme mot de pase.
`DB_HOST = cluster0.7nc7x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

Pour finir rendez-vous sur http://localhost:4200/ dans votre navigateur.
