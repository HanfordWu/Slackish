import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { setUser } from "./actions";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import "semantic-ui-css/semantic.min.css";

import firebase from "./firebase";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

// global states
const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
    componentDidMount() {
        // Here is a listener, once user logged in, we go to home path
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                this.props.setUser(user)
                this.props.history.push("/");
            }
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        );
    }
}

const RootWithAuth = withRouter(connect(null, { setUser })(Root));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router> 
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
