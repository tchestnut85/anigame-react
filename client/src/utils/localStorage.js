const LS_KEY = 'anigame_searches';

const setItem = (array = []) => {
	localStorage.setItem(LS_KEY, JSON.stringify(array));
};

const getSavedSearches = async () => {
	const savedSearches =
		(await JSON.parse(localStorage.getItem(LS_KEY))) || [];
	return savedSearches;
};

const saveSearch = async (storageState, searchTerm) => {
	const savedSearches = await getSavedSearches();

	savedSearches.length
		? setItem([searchTerm, ...storageState])
		: setItem([searchTerm]);
};

const clearSearches = async () => {
	localStorage.removeItem(LS_KEY);
};

export { setItem, getSavedSearches, saveSearch, clearSearches };
