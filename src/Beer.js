import React, { Component } from "react";
import Fave from "./Fave";

export default class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullDescription: false,
    };
  }

  handleToggleDescription = () => {
    this.setState({ showFullDescription: !this.state.showFullDescription });
  };

  render() {
    if (!this.props.beer) return <h1>Loading...</h1>;
    let description = this.props.beer.description;
    let maxLength = 150;
    if (description.length > maxLength) {
      description = description.substring(0, maxLength) + "...";
    }
    if (!this.state.showFullDescription) {
      return (
        <>
          <div className="card">
            <h3>{this.props.beer.name}</h3>
            <h4>
              {description}
              <a
                href="#"
                onClick={() =>
                  this.setState({
                    showFullDescription: !this.state.showFullDescription,
                  })
                }
              >
                {this.state.showFullDescription ? "Less" : "More"}
              </a>
            </h4>
            <p>{this.props.beer.abv}</p>
            <Fave />
            <img src={this.props.beer.image_url} className="image"></img>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="card">
            <h3>{this.props.beer.name}</h3>
            <h4>{this.props.beer.description}</h4>
            <p>{this.props.beer.abv}</p>
            <Fave />
            <img src={this.props.beer.image_url} className="image"></img>
          </div>
        </>
      );
    }
  }
}
