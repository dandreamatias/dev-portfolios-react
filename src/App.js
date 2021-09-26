import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import AddSite from './pages/add-site/AddSite';
import Favorites from './pages/favorites/Favorites';
import DailyMixPage from './pages/daily-mix/DailyMix.page';
import Nav from './components/navbar/Nav';
import { Toast } from './components/toast/Toast';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/daily-mix'>
          <DailyMixPage />
        </Route>
        <Route path='/add-site'>
          <AddSite />
        </Route>
        <Route path='/favorites'>
          <Favorites />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      <Toast />
    </Router>
  );
}

export default App;
