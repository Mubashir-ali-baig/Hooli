import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./actions/authActions";
import store from "./store";
import Dashboard from "./components/dashboard/dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/commons/privateRoute";
import CreateProfile from './components/create-profile';
import EditProfile from './components/edit-profile';
import AddExperience from "./components/add_experience";
import Profiles from './components/profiles/profiles';
import Profile from './components/single_profile/profile';


//this code makes sure the user is logged in even on switching to other pages
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  //logout the user when the jwt token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(clearCurrentProfile());
    store.dispatch(logOutUser());

    //redirects to login

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/profile/:handle" component={Profile}/> 
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route  exact path="/profiles" component={Profiles}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-experience" component={AddExperience} />


          <Route path="/" component={Landing} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
