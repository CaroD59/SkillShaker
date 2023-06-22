# SKILLSHAKER

Lien de la page WIKI : https://wiki.itroom.fr/index.php/SkillShaker

# Pré-requis

L'application fonctionne avec Docker et les commandes du Makefile

# Installation

1. Cloner les sources du projet sur votre environnement local : `git clone git@github.com:it-room/SkillShaker.git`
2. Créer le fichier `infra/.env.local` à partir du fichier `infra/.env` et changer le PORT pour mettre `3000`
3. Créer le fichier `.env.local` à partir du fichier `.env` et renseigner les variables selon vos besoins
4. À la racine du projet, lancer la commande `make build` pour construire les images docker du projet
5. À la racine du projet, lancer la commande `make assets-build` pour installer les dépendances et build les assets front du projet

# Compilation assets

## En local

Il est conseillé d'utiliser la commande `make assets-watch` qui permet de compiler à chaque modification les fichiers.
Après la compilation en watch, vous pouvez accèder au projet via le lien : `http://localhost:3000/`


# Contrôle qualité du code

Sur le projet il y a `Husky` installé qui contrôle à chaque commit la qualité du code grâce aux règles mise en place avec `Prettier` et `EsLint`.

Si le code ne rEspecte pas la qualité, le commit sera bloqué avec un message d'erreur et une ligne de commande à lancer pour fixer les erreur : `make lint-staged-fix`.

Vous pouvez vérifier et corriger vos fichiers avant le commit avec ces commandes :

1. Lancer la commande `make prettier-check`. Cette commande permet de vérifier s'il y a des corrections à faire dans les fichiers SCSS et TS.
2. S'il y a des corrections à faire, lancer la commande `make prettier-write`. Cette commande modifiera automatiquement les fichiers pour le rendre plus propre.
