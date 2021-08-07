import './index.css';

import { Main } from './pages/Main';
import { NavBar } from './components/NavBar/NavBar';
import { SearchProvider } from './utils/context/SearchState';

function App() {
	return (
		<>
			<SearchProvider>
				<NavBar />
				<Main />
			</SearchProvider>
		</>
	);
}

export default App;
