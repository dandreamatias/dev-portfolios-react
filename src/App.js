import './App.css';
import './style/layout.css';
import './style/form.css';
import './style/buttons.css';
import './style/utils.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import AddSite from './pages/add-site/AddSite';
import Favorites from './pages/favorites/Favorites';
import DailyMixPage from './pages/daily-mix/DailyMix.page';
import Nav from './components/navbar/Nav';
import { Toast } from './components/toast/Toast';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';

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
        <ProtectedRoute path='/admin'>
          <Admin />
        </ProtectedRoute>
        <Route path='/login'>
          <Login />
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
