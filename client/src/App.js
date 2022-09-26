import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { Details } from './pages/Details';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { Main } from './pages/Main';
import { NavBar } from './components/NavBar/NavBar';

import store from './redux/store';
import { ROUTES } from './constants';

import './sass/index.scss';
import styles from './App.module.scss';

function App() {
  return (
    <>
      <Provider store={store}>
        <div className={styles.container}>
          <NavBar />
          <Hero />
          <Router>
            <Switch>
              <Route exact path={ROUTES.home} component={Main} />
              <Route exact path={ROUTES.title} component={Details} />
              <Route render={() => <Redirect to={ROUTES.home} />} />
            </Switch>
          </Router>
          <Footer />
        </div>
      </Provider>
    </>
  );
}

export default App;
