# API
L'API utilise [TypeScript](https://www.typescriptlang.org/) qui est une "sur-couche" à Javascript et qui permet de typer notre code. Elle utilise aussi le framework [NestJS](https://docs.nestjs.com/).
Pour le "moteur de recherche", [Typesense](https://typesense.org/) est utilisé car il est facile à configurer pour une utilisation basique.
Pour la base de donnée, [MongoDB](https://www.mongodb.com/) est utilisé, mais d'autres base de données ferait aussi l'affaire. MongoDB a été utilisé principalement pour son intégration avec JavaScript.

## Structure
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

Il y a dans le code des commentaires `TODO: `, ceux-ci indiquent des suggestion d'amélioration futures qui ne sont pas néccésaire dans l'état actuel des choses
