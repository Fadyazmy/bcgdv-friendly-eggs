import React from "react";
import login from "./Login";
import GoalPicker from "./GoalPicker";
import home from "./Home";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function App() {
  return (
    <main>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Friendly Eggs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/goalPicker">Goal Picker</Nav.Link>
            {/* TODO: Julia */}
            <Nav.Link href="/request_feedback">Request</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/goalPicker" component={GoalPicker} />
        {/* <Route exact path="/request_feedback" component={request_feedback} /> */}
      </Switch>
    </main>
  );
}

export default App;
