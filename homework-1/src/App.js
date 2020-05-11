import React from 'react';
import NavBar from './components/NavBar'
import Login from './components/Login'
import Footer from './components/Footer'
import Register from './components/Register'
import PrivateRouter from './components/LoginPrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import Recepies from './components/Recepies'
import Home from './components/Home'
import ManageUsers from './components/ManageUsers'
import EditUser from './components/EditUser'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const  App = () => {
  return (
    <Router>
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <PrivateRouter path="/recepies">
            <Recepies />
          </PrivateRouter>

          <AdminPrivateRoute path="/manageUsers">
            <ManageUsers />
          </AdminPrivateRoute>

          <AdminPrivateRoute path="/editUser/:userID">
            <EditUser />
          </AdminPrivateRoute>

        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
