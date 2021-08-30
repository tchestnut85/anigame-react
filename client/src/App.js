import './index.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Details } from './pages/Details';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
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
					<Hero />
					<Router>
						<Switch>
							<Route
								exact
								path='/anigame-react'
								component={Main}
							/>
							<Route
								exact
								path={`/anigame-react/:title`}
								component={Details}
							/>
						</Switch>
					</Router>
					<Footer />
				</div>
			</SearchProvider>
		</>
	);
}

export default App;
