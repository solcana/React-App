import React, { Component } from "react";

export class BeerDescription extends Component {
  render() {
    return (
      <div className="card">
        <h3>{this.props.beer.name}</h3>
        <h5>{this.props.beer.description}</h5>
        <p>{this.props.beer.abv}</p>
        <img src={this.props.beer.image_url} className="image"></img>
      </div>
    );
  }
}

export default BeerDescription;
