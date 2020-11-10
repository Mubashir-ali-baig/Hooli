import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import Spinner from './Spinner';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import firebase from "./firebase";
import {createStore} from 'redux';
import {Provider,connect } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducers";
import {setUser,clearUser} from './actions'

const store = createStore(rootReducer,composeWithDevTools());

class Root extends React.Component {
  componentDidMount(){
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.props.setUser(user);
        this.props.history.push("/");
      }
      else{
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? <Spinner /> :(
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
    );
    
  }
}

const mapStateFromProps = state =>({
    isLoading: state.user.isLoading
})

const RootWithAuth= withRouter(connect(mapStateFromProps,{setUser,clearUser})(Root))

ReactDOM.render(
    <Provider store={store}>
    <Router>
    <RootWithAuth />
    </Router>
    </Provider>
    , document.getElementById("root"));
registerServiceWorker();