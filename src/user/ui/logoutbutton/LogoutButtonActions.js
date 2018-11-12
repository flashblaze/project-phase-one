import { browserHistory } from "react-router";

export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  };
}

export function logoutUser() {
  return function(dispatch) {
    // Logout user.
    dispatch(userLoggedOut());
    localStorage.setItem("uPortUserCredentials", JSON.stringify(null));
    // Redirect home.
    return browserHistory.push("/");
  };
}
