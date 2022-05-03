const LS_KEY = 'anigame_searches';

const setItem = array => {
  localStorage.setItem(LS_KEY, JSON.stringify(array));
};

const getSavedSearches = () => {
  const savedSearches = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  return savedSearches;
};

const saveSearch = (storageState, searchTerm) => {
  const savedSearches = getSavedSearches();

  const searchesArr = savedSearches.includes(searchTerm)
    ? [...storageState]
    : [searchTerm, ...storageState];

  savedSearches.length ? setItem(searchesArr) : setItem(searchesArr);
};

const clearSearches = () => {
  localStorage.removeItem(LS_KEY);
};

export { getSavedSearches, saveSearch, clearSearches };
