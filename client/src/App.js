import './index.css';

import { Footer } from './components/Footer/Footer';
import { Main } from './pages/Main';
import { NavBar } from './components/NavBar/NavBar';
import { SearchProvider } from './utils/context/SearchState';
import styles from './App.module.css';

function App() {
	return (
		<>
			<SearchProvider>
				<div className={styles.container}>
					<NavBar />
					<Main />
					<Footer />
				</div>
			</SearchProvider>
		</>
	);
}

export default App;
