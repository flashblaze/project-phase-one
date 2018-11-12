import { browserHistory } from "react-router";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { applicationID, applicationKey, API_PATH } from "./keys/bigchaindbKey";
const BigchainDB = require("bigchaindb-driver");
// import Cookies from "js-cookie";
import { routerMiddleware } from "react-router-redux";

import reducer from "./reducer";

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);
const userData = JSON.parse(localStorage.getItem("uPortUserCredentials"));
const preLoadedState = {
  user: {
    data: userData
  }
};
const isSignedIn = () => {
  const conn = new BigchainDB.Connection(API_PATH, {
    app_id: applicationID,
    app_key: applicationKey
  });
  conn.searchAssets(userData.address).then(res => {
    return !(res.length == 0);
  });
};

const store =
  userData !== null && userData && isSignedIn
    ? createStore(
        reducer,
        preLoadedState,
        composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware))
      )
    : createStore(
        reducer,
        composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware))
      );

export default store;
