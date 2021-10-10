import './App.css';
import './style/layout.css';
import './style/form.css';
import './style/buttons.css';
import './style/utils.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/navbar/Nav';
import { Toast } from './components/toast/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import history from './history.js';

const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const Favorites = lazy(() => import('./pages/favorites/Favorites'));
const DailyMix = lazy(() => import('./pages/daily-mix/DailyMix.page'));
const AddSite = lazy(() => import('./pages/add-site/AddSite'));
const Admin = lazy(() => import('./pages/admin/Admin'));

function App() {
  return (
    <Router history={history}>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/daily-mix'>
            <DailyMix />
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
      </Suspense>
      <Toast />
    </Router>
  );
}

export default App;
