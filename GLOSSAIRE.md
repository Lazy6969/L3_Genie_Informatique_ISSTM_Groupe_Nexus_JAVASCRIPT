# Glossaire & Concepts : React vs Vue.js

Ce document est un guide de survie pour comprendre les termes techniques utilisés dans ce projet et dans le monde des frameworks JavaScript.

---

## Concepts Généraux (Valables partout)

| Mot-clé | Définition |
| :--- | :--- |
| **Composant** | Un morceau d'interface réutilisable (ex: un bouton, une barre de recherche). C'est comme une brique de LEGO. |
| **State (État)** | La mémoire du composant. Si l'état change (ex: la liste des films se met à jour), le framework redessine l'interface automatiquement. |
| **Props** | (Propriétés) Données envoyées d'un composant parent à un enfant (ex: envoyer le titre d'un film à une `MovieCard`). |
| **API** | (Interface de Programmation) Un service qui fournit des données (ici, TMDB nous donne la liste des films au format JSON). |
| **Fetch** | La fonction JavaScript standard pour aller chercher des données sur Internet. |
| **Asynchrone** | Une action qui prend du temps (comme un appel API). On utilise `async` et `await` pour gérer cela. |

---

## Dictionnaire React

| Mot-clé | Rôle |
| :--- | :--- |
| **JSX** | Mélange de HTML et JavaScript. Ex: `<h1>{movie.title}</h1>`. |
| **`useState`** | Le "Hook" pour créer un état. `const [movies, setMovies] = useState([])`. |
| **`useEffect`** | Le "Hook" pour les effets secondaires. On l'utilise pour appeler l'API au chargement du composant. |
| **`props`** | Reçues en argument de la fonction : `function MyComponent(props) { ... }`. |
| **React Router** | La bibliothèque pour gérer les pages (`/`, `/movie/123`). |

---

## Dictionnaire Vue.js

| Mot-clé | Rôle |
| :--- | :--- |
| **SFC** | (Single File Component) Fichier `.vue` contenant `<template>`, `<script>` et `<style>`. |
| **`ref()`** | Créer un état réactif. `const movies = ref([])`. On y accède via `movies.value`. |
| **`onMounted`** | Fonction exécutée quand le composant apparaît. Idéal pour l'appel API. |
| **Directives** | Attributs spéciaux commençant par `v-`. |
| **`v-model`** | Lie un input à une variable de façon bidirectionnelle (Two-way binding). |
| **`v-for`** | Pour faire une boucle sur une liste (équivalent du `.map()` en React). |
| **Vue Router** | Le gestionnaire de navigation officiel de Vue. |

---

## Tableau de Correspondance (Traducteur)

Si vous savez faire l'un, vous savez faire l'autre !

| Action | En React | En Vue.js |
| :--- | :--- | :--- |
| **Afficher une variable** | `{ title }` | `{{ title }}` |
| **Boucler sur une liste** | `movies.map(m => ...)` | `v-for="m in movies"` |
| **Affichage conditionnel** | `{ loading && <p>...</p> }` | `v-if="loading"` |
| **Créer un état** | `useState([])` | `ref([])` |
| **Événement clic** | `onClick={doSomething}` | `@click="doSomething"` |
| **Passer une prop** | `<Card movie={m} />` | `<Card :movie="m" />` |

---

## Astuce pour l'exercice
N'essayez pas de tout apprendre par cœur. Utilisez ce glossaire comme une aide-mémoire pendant que vous codez. Si vous bloquez sur "comment faire une boucle", regardez la ligne **v-for** ou **.map()** ! M. Florent. 
