# CineScope — Movie Discovery Platform

Midterm project: a platform for finding movies and managing a personal viewing list.
Built with **Vue 3, Vue Router 4, Vuex 4, Axios** and a mock REST API on **json-server**.

## Run

```bash
npm install
npm run dev        # starts json-server (http://localhost:3000) + Vite (http://localhost:5173)
```

Or separately: `npm run server` and `npm run client`.

Demo account: **demo@mail.com / 123456** (or register a new one).

## Features

- Movie catalog with search (title, director, actor), genre filter and sorting
- Genre pages, detailed movie page with cast, similar movies and user reviews
- Favorites and watchlist (with "watched" status and progress)
- Registration / login, protected pages, reviews only for logged-in users
- Loading states and error messages (try stopping json-server, or open `/movies/999`)

## Pages (Vue Router)

| Route | Page |
|---|---|
| `/` | Catalog (search, filter, sort) |
| `/movies/:id` | Movie details + reviews — **dynamic route** |
| `/genre/:name` | Movies of one genre — **dynamic route** |
| `/favorites` | Favorites — protected |
| `/watchlist` | Watchlist — protected |
| `/login`, `/register` | Auth |
| `/:pathMatch(.*)*` | 404 |

## Where each requirement is implemented

| Requirement | Where |
|---|---|
| 3+ pages, Vue Router, navigation | `src/router/index.js`, `router-link`, `$router.push/back` |
| Dynamic routing | `/movies/:id`, `/genre/:name` (params passed as props) |
| Navigation guard | `router.beforeEach` — protected routes + redirect back after login |
| Axios GET | `src/api/index.js` — movies, genres, reviews, users |
| Axios POST | `addReview` (POST `/reviews`), `register` (POST `/users`) |
| Axios interceptor / error handling | `src/api/index.js` |
| Reusable components | `MovieCard`, `MovieGrid`, `MoviePoster`, `RatingBadge`, `SearchBar`, `GenreFilter`, `ReviewForm`, `EmptyState`, `BaseLoader`, `ErrorMessage` |
| Global component registration | `BaseLoader`, `ErrorMessage` in `src/main.js` |
| Vuex (state, getters, mutations, actions, modules) | `src/store/modules/auth.js`, `movies.js`, `lists.js` |
| Custom events child → parent | `MovieCard` emits `toggle-favorite` / `toggle-watchlist`; `GenreFilter` emits `change`; `ReviewForm` emits `submit`; `ErrorMessage` emits `retry`; `SearchBar` emits `update:modelValue` |
| Slots | `MovieCard` (watched checkbox in Watchlist), `EmptyState` |
| v-for, v-if / v-else, v-model, v-bind, v-on | everywhere — e.g. `HomeView.vue`, `ReviewForm.vue`, `LoginView.vue` |
| Custom v-model on component | `<SearchBar v-model="search">` |
| computed | `filteredMovies`, `similar`, `percent`, `charsLeft`, `errors`, ... |
| watchers | `HomeView` — debounced search synced to URL; `MovieDetailView` — `id` param (reload when navigating movie → movie), document title |
| Lifecycle hooks | `created`, `mounted`, `beforeUnmount`, `unmounted` |
| async/await | all Vuex actions, `postReview`, login/register |
| Loading + error states | `BaseLoader`, `ErrorMessage` with retry |
| Authorization in Vuex + localStorage | `src/store/modules/auth.js` (user + token), per-user lists in `lists.js` |
| Mock service | `json-server` with `db.json` |

## Project structure

```
db.json                 mock database (movies, genres, reviews, users)
src/
  api/index.js          axios instance + API methods
  store/                Vuex store (auth, movies, lists modules)
  router/index.js       routes + navigation guard
  components/           reusable components
  views/                pages
  assets/main.css       global styles
```
