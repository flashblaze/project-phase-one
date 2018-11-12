import { uport } from "../../../util/connectors.js";
import { browserHistory } from "react-router";
import {
  applicationID,
  applicationKey,
  API_PATH
} from "../../../keys/bigchaindbKey";
const BigchainDB = require("bigchaindb-driver");
export const USER_LOGGED_IN = "USER_LOGGED_IN";
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
}

function getUser(userCredentials) {
  console.log(userCredentials);
  const conn = new BigchainDB.Connection(API_PATH, {
    app_id: applicationID,
    app_key: applicationKey
  });

  conn.searchAssets(userCredentials.address).then(res => {
    if (res.length == 0) {
      browserHistory.push("signIn?user=" + JSON.stringify(userCredentials));
    }
  });

  // const seed = bip39.mnemonicToSeed("ProjectINK").slice(0, 32);
  // const alice = new BigchainDB.Ed25519Keypair(seed);
}

export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport
      .requestCredentials({
        requested: ["name", "avatar", "phone", "country"]
      })
      .then(credentials => {
        dispatch(userLoggedIn(credentials));
        getUser(credentials);
        localStorage.setItem(
          "uPortUserCredentials",
          JSON.stringify(credentials)
        );
        var currentLocation = browserHistory.getCurrentLocation();
        if ("redirect" in currentLocation.query) {
          return browserHistory.push(
            decodeURIComponent(currentLocation.query.redirect)
          );
        }
        return browserHistory.push("/dashboard");
      });
  };
}
