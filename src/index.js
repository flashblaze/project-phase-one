import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { UserIsAuthenticated } from "./util/wrappers.js";

// Layouts
import App from "./App";
import Home from "./layouts/home/Home";
import Dashboard from "./layouts/dashboard/Dashboard";
import Profile from "./user/layouts/profile/Profile";
import SignIn from "./layouts/signIn/SignIn";
import WatchVideo from "./layouts/watchVideo/WatchVideo";
import UploadVideo from "./layouts/uploadVideo/UploadVideo";
// Redux Store
import store from "./store";
// semantic-ui-css

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route path="signIn" component={SignIn} />
        <Route
          path="uploadVideo"
          component={UserIsAuthenticated(UploadVideo)}
        />
        <Route path="watchVideo" component={WatchVideo} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
