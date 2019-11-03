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
        <p>Log in to access your Friendly Eggs profile!!</p>
      </div>
    );
  }
}

export default Home;
