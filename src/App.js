import React, { useContext } from "react";
import Login from './components/Login_SignUp';
import RequestFeedback from './components/RequestFeedback';
import Home from "./Home";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { UserContext } from "./providers/UserProvider";
import { signOut } from './firebase';

const App = () => {
  const user = useContext(UserContext);
  // console.log(" HELLO ", user);

  return (
    <main>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Friendly Eggs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {user && user.id? [
              <Nav.Link key="signout" onClick={signOut} href="/"> Log out</Nav.Link>
            ]: (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            <Nav.Link href="/request_feedback">Request</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
      {user && user.id ? (
            [
              <Route exact path="/" key={"/-not_signed_in"} component={Home} />
            ]
          ) : (
            <Route
              exact
              path="/"
              key={"/-dashboard"}
              // Dashboard
              component={Home}
            />
          )}
          <Route exact path="/login" component={Login} />
        <Route exact path="/request_feedback" component={RequestFeedback} />
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/request_feedback" component={request_feedback} /> */}
      </Switch>
    </main>
  );
}

export default App;
