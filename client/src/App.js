import React from "react";
import { Route, Switch } from "react-router-dom";

// local imports
import NavBar from "./components/nav/NavBar.js";
// import Content from "./components/content/Content.js";
// import Footer from "./components/nav/Footer.js";

// testing
import Login from "./components/content/Login.js";

function App() {
  const initialState = {
    login: {
      isLogginIn: false,
      isLoggedIn: false,
      error: ""
    },
    user: {
      id: null,
      username: null,
      email: null
    },
    allUsers: [],
    error: ""
  };

  return (
    <div>
      {/* routes */}

      <Route path="/signup" />
      <Route path="/login" />

      {/* components */}
      <NavBar isLoggedIn={initialState.login.isLoggedIn} />
      {/* <Content />
      <Footer /> */}
      <Login />
    </div>
  );
}

export default App;
