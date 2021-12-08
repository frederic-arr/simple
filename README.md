# Projet

## Complétion
Le projet remplis le cahier des charges initiales (à savoir une liste de médias avec les liens correspondants)

Quelques changements on néamoins été opérés:
- Le site est passé d'une page à deux pour plusieurs raison:
  - Avec le design originel, sur mobile l'affiche du média n'était que peu visible
  - De plus, sur ordinateur/desktop, le fait d'"étendre" la carte était contre-intuitif et cassait visuelement le reste du site
  
  C'est pour ces raisons que la page principale est maintenant une grille avec l'image comme élément proéminent et le titre en dessous qui, une fois cliqué, nous ammène sur la page des détails du média

Quelques nouvelles fonctionalités on été ajoutée:
  - Un synopsis a aussi été ajouté sur la page des details afin de ne pas laisser *trop* de vide
  - Le site fonctionne aussi bien sur mobile que sur desktop
  - La recherche est quasi-instantanée (il y a un léger délai pour laisser le temps à l'utilisateur d'entrer plusieurs caractères)
  - Le site dispose de deux thèmes:
    - Sombre (par défaut)
    - Claire
    
    Qui peuvent être changés avec l'icône est bas à droite
    - Une API admin (avec authentication via clé API). Voir la spécification OpenAPI
    - Les images sont lazy-loadé (chargé que lorsque les utilisateurs les vois) et redimensionée automatiquemetn afin de réduire la bande passante sur les petite connexions

## Outils et Technologies utilisé
- [MongoDB](https://www.mongodb.com/) est utilisé pour la base de donnée, mais d'autres base de données ferait aussi l'affaire. MongoDB a été utilisé principalement pour son intégration avec JavaScript.
- [Typesense](https://typesense.org/) est utilisé en tant que "moteur de recherche" car il est facile à configurer pour une utilisation basique.
- [TypeScript](https://www.typescriptlang.org/) comme language principal. C'est une "sur-couche" à JavaScript qui permet de typer notre code.
- [NestJS](https://nestjs.com/) est le framework backend
- [Next.js](https://nextjs.org/) est le framework frontend
- [Docker](https://www.docker.com/) est utilisé pour build les images (et accessoirement pour le déployement dans notre cas)
- [PnPm](https://pnpm.io/) est utilisé pour administrer les dépendances externes
- [ESLint](https://eslint.org/) et [Prettier](https://prettier.io/) sont utilisés pour forcer un style de code consistant (majoritairement sur le backend)
- Les icônes viennent de [Google Fonts Icons](https://fonts.google.com/icons)
- Les données initales sur les médias viennent [MongoDB Sample Mflix Dataset](https://docs.atlas.mongodb.com/sample-data/sample-mflix/#std-label-sample-mflix)

## Données
Seuls les champs `movies.title` (en tant que `name`), `movies.fullplot` (en tant que `synopsis`), et `movies.poster` (en tant que `image`) ont été gardé.

Les liens de chaque médias sont généré aléatoirement et ne fonctionnent PAS. Ils ont uniquement là à titre de démonstration.

La taille des données à été réduite à ~3'000 entrée

### Schema
<TODO>

## API
La spécification de l'api est fournie au format [OpenAPI 3](https://swagger.io/specification/) dans le fichier `openapi.yml`.

La clé API permetant d'effectuer des opérations POST/PUT/DELETE est `D09XPFWM1-110ZJJ10W-YJMKJ3KNT-AR97JXJD7` dans le header `X-Api-Key` (insensible à la case)

Le site web est accessible à l'addresse: https://cfpt-2122-atapp-streamguide.farroyo.ch/

L'API est accessible à l'addresse: https://cfpt-2122-atapp-streamguide.farroyo.ch/api

### Structure
Le code de l'API est structuré comme suit:
- `libs/` contient des librairies qui ne sont pas directement dépendants de NestJS
- `modules/common/` contient des librairies spécifiques à NestJS
pouvoir les paratager entre plusieurs applications.
- `modules/**/*` contient tous les modules spécifiques à l'application. Pour l'instant il contient uniquement `data/` qui lui-même contient `media/`.
- `data/` est juste un module racine qui servirait a regrouper d'autres données s'il y en avait plusieurs (ex. `news/`, - `games/`, etc.), si ou souaithe rajouter des utilisateurs, on utiliserait un nouveau module racine `users/`. 

Chaque module peut contenir l'un des fichiers suivants:
- `*.module.ts` voir la [Documentation sur les modules de NestJS](https://docs.nestjs.com/modules)
- `*.controller.ts` voir la [Documentation sur les controlleurs de NestJS](https://docs.nestjs.com/controllers)
- `*.guard.ts` voir la [Documentation sur les gardes de NestJS](https://docs.nestjs.com/guards)
- `*.service.ts` voir la [Documentation sur les providers de NestJS](https://docs.nestjs.com/providers)
- `*.interface.ts` qui contient les définitions de types utilisé par le module
- `*.constants.ts` qui contient les constantes utilisés par le module
- `*.dto.ts` qui contient les DTO (Data Transfer Objects) utilisé par le module afin de créer/modifier des données et qui sert a valider ces dernières
  
(d'autres fichiers peuvent aussi être présent mais son d'importance moindre)

**NOTE**: les modules peuvent contenir d'autres modules qui eux-même peuvent en contenir d'autres etc.

En temps normal, la majorité du contenu de `libs/` et `common/` serait éxtrait dans des package séparé afin de pouvoir les réutiiser à travers divers applications.

Il y a dans le code des commentaires `TODO: `, ceux-ci indiquent des suggestion d'amélioration futures qui ne sont pas nécéssaire dans l'état actuel des choses.

## Frontend
Le frontend est composé de deux pages:
- l'index (`/`), qui affiche la liste des médias disponibles avec une barre de recherche
- le media (`/<id du media>`) qui affiche les détails du média avec la liste des liens et le synopsis
