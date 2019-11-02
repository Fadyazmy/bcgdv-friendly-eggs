import React, { Component } from "react";
import logo from "./logo.svg";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App-header App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Friendly egggggs!!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    );
  }
}

export default Home;
