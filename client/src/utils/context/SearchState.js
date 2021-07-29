import { createContext, useContext } from 'react';

import { useSearchReducer } from './searchReducer';

const SearchContext = createContext();
const { Provider } = SearchContext;

const SearchProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useSearchReducer({
		query: '',
		gameState: [],
		gameScore: null,
		animeState: [],
		animeStreamUrls: [],
		error: null,
		gameLoading: false,
		animeLoading: true,
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useSearchContext = () => {
	return useContext(SearchContext);
};

export { SearchProvider, useSearchContext };
