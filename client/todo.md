# AniGame React - ToDo List

### Enhancements

- [x] AnimeResult component - Fix bug with the streaming link being out of order with the animes being displayed
- [x] Fix Kitsu API anime search filter so that it only gets titles back that have the query string in the actual title on the anime. Currently getting weird slightly related shows
- [x] Format star ratings for games and anime
- [x] Setup modals to display on error/if there are no game or anime results for a title
- [x] Setup react-router or a modal component for single item pages of game and anime, with more detailed descriptions or reviews/information/more video clips, etc
- [x] Setup localstorage feature
- [x] Setup saved buttons search function
- [x] Setup console wars buttons to change the theme color of the app
- [x] Make loader component to display when loading game/anime results
- [ ] Move selectors used multiple times to redux files

### Bugs

- [x] Add Scrolling to game result section after a search completes
- [ ] Fix when clicking back to results button on Details page, it is triggering the search again and the "no anime found" error modal pops up again if no anime results found
- [x] fix scroll position when going from single detail back to results
