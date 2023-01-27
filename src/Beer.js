import React, { Component } from "react";
import Fave from "./Fave";

export default class Beer extends Component {
  handleDelete = () => {
    this.props.handleDelete(this.props.beer);
  };
  render() {
    return (
      <>
        <div className="card">
          <h2>{this.props.beer.name}</h2>
          <h4>{this.props.beer.tagline}</h4>
          <img src={this.props.beer.image_url} className="image"></img>
          <Fave
            beer={this.props.beer}
            onClickFave={this.props.onFavoriteClick}
            isFave={this.props.isFave}
          />
          <button className="deleteBtn" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      </>
    );
  }
}
