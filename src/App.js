import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import AddSite from './pages/add-site/AddSite';
import Favorites from './pages/favorites/Favorites';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <Nav />
      <main className='main'>
        <Switch>
          <Route path='/add-site'>
            <AddSite />
          </Route>
          <Route path='/favorites'>
            <Favorites />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
