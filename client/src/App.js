import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";

// local imports
import PrivateRoute from "./components/PrivateRoute.js";
import NavBar from "./components/nav/NavBar.js";
// import Content from "./components/content/Content.js";
// import Footer from "./components/nav/Footer.js";

// testing
import Login from "./components/content/Login.js";
import Signup from "./components/content/Signup.js";
import Dashboard from "./components/content/Dashboard.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      {/* components */}
      <NavBar isLoggedIn={isLoggedIn} />
      {/* <Content />
      <Footer /> */}

      {/* routes */}
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" render={props => <Login {...props} />} />
      </Switch>

      <Route path="/signup" render={props => <Signup {...props} />} />
    </div>
  );
}

export default App;
