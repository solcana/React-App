import React, { Component } from "react";
import Fave from "./Fave";

export default class Beer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="card">
          <h3>{this.props.beer.name}</h3>
          <img src={this.props.beer.image_url} className="image"></img>
          <Fave
            beer={this.props.beer}
            onClickFave={this.props.onFavoriteClick}
            isFave={this.props.isFave}
          />
        </div>
      </>
    );
  }
}
