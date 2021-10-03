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

	if (savedSearches.includes(searchTerm)) {
		return;
	}

	savedSearches.length
		? setItem([searchTerm, ...storageState])
		: setItem([searchTerm]);
};

const clearSearches = () => {
	localStorage.removeItem(LS_KEY);
};

export { setItem, getSavedSearches, saveSearch, clearSearches };
