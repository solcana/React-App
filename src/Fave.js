import React, { Component } from "react";

export class Fave extends Component {
  handleClick = (e) => {
    console.log("handling Fave click");
  };
  render() {
    return (
      <div className="beerFave">
        <p className="faveIcon">add_to_fave</p>
      </div>
    );
  }
}

export default Fave;
