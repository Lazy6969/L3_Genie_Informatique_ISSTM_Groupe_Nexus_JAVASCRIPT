# Instructions : Projet CineMaster (Framework JS - L3)

Le projet **CineMaster** ! L'objectif est de mettre en pratique vos connaissances sur les frameworks JavaScript (React ou Vue.js) en créant une application de catalogue de films.

## Objectifs
1.  Utiliser un framework JS moderne (React ou Vue).
2.  Interagir avec une API réelle (The Movie Database - TMDB).
3.  Gérer un état local et persistant (LocalStorage).
4.  Mettre en place une navigation fluide (Routing).

---

## Pré-requis
- **Node.js** installé (v18+).
- Une connaissance de base en **JavaScript ES6+** (const/let, arrow functions, fetch, map/filter).
- Une **Clé API TMDB** :
    1. Créez un compte sur [themoviedb.org](https://www.themoviedb.org/).
    2. Allez dans `Settings > API` et générez une clé "API Key (v3 auth)".

---

## Étapes du projet

### Étape 1 : Initialisation & Structure UI
Si vous utilisez les dossiers `starters/`, la configuration de base avec **Vite** est déjà faite.
- **Tâche** : Créez vos premiers composants.
    - `Header.jsx/vue` : Titre de l'application.
    - `SearchBar.jsx/vue` : Un champ input pour la recherche.
    - `MovieCard.jsx/vue` : Affiche l'affiche du film, son titre et sa note.
    - `MovieGrid.jsx/vue` : La liste qui contiendra les cartes.

### Étape 2 : Appels API (Fetching Data)
Vous devez récupérer les films "tendances" au chargement de l'application.
- **Endpoint** : `https://api.themoviedb.org/3/trending/movie/week?api_key=VOTRE_CLE_API`
- **Tâche** : Utilisez `fetch` pour obtenir les données.
    - **React** : Utilisez le hook `useEffect` et `useState`.
    - **Vue** : Utilisez le lifecycle hook `onMounted` et `ref`.

### Étape 3 : Recherche Dynamique
Permettez à l'utilisateur de chercher un film spécifique.
- **Endpoint** : `https://api.themoviedb.org/3/search/movie?api_key=VOTRE_CLE_API&query=NOM_DU_FILM`
- **Tâche** : Connectez l'input de `SearchBar` à une fonction qui déclenche l'appel API.

### Étape 4 : Système de Favoris (Persistance)
L'utilisateur peut marquer des films en favoris.
- **Tâche** :
    1. Ajoutez un bouton "❤️" sur chaque carte de film.
    2. Gérez une liste `favorites` dans l'état global/local.
    3. Sauvegardez cette liste dans le `localStorage` pour qu'elle ne disparaisse pas au rafraîchissement.

### Étape 5 : Routing (Bonus/Avancé)
Permettez de cliquer sur un film pour voir ses détails (synopsis, acteurs).
- **Bibliothèque** : `react-router-dom` (React) ou `vue-router` (Vue).
- **Tâche** : Créez une page `MovieDetail` accessible via une URL dynamique (ex: `/movie/123`).

---

## Conseils spécifiques par framework

### Option A : React
- Pour passer des données entre composants, utilisez les **Props**.
- Pour changer l'interface, utilisez les états (`useState`).
- N'oubliez pas les `keys` lors de l'utilisation de `.map()`.

### Option B : Vue.js
- Utilisez `v-model` pour l'input de recherche.
- Utilisez `v-for` pour boucler sur les films.
- Utilisez `v-if` / `v-else` pour gérer les états de chargement.

---

## Critères de réussite
- L'application est fluide et réactive.
- Les images des films s'affichent correctement (Base URL TMDB : `https://image.tmdb.org/t/p/w500/`).
- La recherche fonctionne sans erreurs.
- Les favoris persistent après un rafraîchissement de la page.
