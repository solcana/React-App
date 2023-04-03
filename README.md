# Beer React App

## Description

This is a React App, built over 4 days as a solo project, where a user can search for their most loved beers within a beer list, favorite them, and edit the list.

---

## Links

https://63d3b0753a64e878b9e891f4--sage-crepe-00e0db.netlify.app/

---

## Getting Started / Code Installation

- Clone or download repo $ git clone https://github.com/your-username/your-project-name.git
- Navigate into project directory $ cd your-project-name
- Install all dependencies and necessary packages $ npm install
- In your terminal start the server with $ npm start, and in your browser start a development server at https://localhost:3000/ to view the application 

---

## Timeframe / Working Team

Project was built solo, over a period of 4 days.

--- 

## Technology Used

- ReactJS
- JSX
- API
- CSS
- Git
- GitHub
- Fontawesome

---

## Brief 

For this project you will have to build a web application using ReactJS and an API of your choice. This SPA will be a list of any type of items.

You will be working individually for this project, but we'll be guiding you along the process and helping as you go. Show us what you've got!

- A front-end list based React application that updates the UI and makes requests to the API.
- Include data from a third-party API.
    - TRY OUT your API using Postman or your browser by making an fetch request before you get too emotionally invested in it, to make sure it works the way you think it does...YOU ARE REQUIRED TO SHOW US YOU CAN RECEIVE THE DATA FOR YOUR PROPOSAL
    
## Planning

I started off the planning by sketching out the wireframe. You could see it attached below. 

![](https://imgur.com/Dm1CgqZ.png)

The idea was to display on the left the list of beers, based on the search criteria in the search function. When clicking on one of the items, the list would expand on the right showing additional details of the beer that was clicked. 

#### User Stories

- As a user, I can search through a list of beers
- As a user, I can add a new beer item to the list
- As a user, I can mark a beer/ multiple beers as favorite
- As a user, I can unfavorite beer / beers
- As a user, I can clear only the favorite beers list
- As a user, I can remove a beer from the list
- As a user, I can delete all beers from the list / clear the list

---

## Build / Code Process

- First step was finding a good, working API that I could use for the react list app. This took me quite some time as it required figuring out the access to the API, testing that it works and that the data type is suitable (an easy to use, accessible, not too nested API). After 1 + day spent on this, I finally found https://api.punkapi.com/v2/beers?malt=pale , a beer api in the format of an array of objects, so I went with that.
- Then I started off by creating the new react app in the terminal. After it was created, I moved on to creating my components, namely: Beer.js and BeerDescription.js (for the expanded view of the beer).
- I started from my App.js, where I imported React and used the usual React configuration for a class-based component. There, I entered a search form to be able to filter through the list of beers I get from the API call. 

```
   <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search beer"
              onChange={this.handleChange}
            />
            <button className="searchBtn" type="submit">
              Search
            </button>
          </form>
```

- I then fetched the data from my API, creating a beerData array in my state in App.js, where I would store all beers associated with the entry in the search function. I decided my search key attribute would be malt type, so I added that to my state as well and then created a handleChange(e) function for its changing value. 

```

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      malt: "",
      beerData: [],
      selectedBeer: null,
      favoriteList: [],
      favoritesCount: 0,
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      malt: value,
    });
  };
```

- Also here, I created a card-container that would hold my beer list on the left side, and the expanded beer description on the right. I used Bootstrap’s card feature for this and CSS for styling. 

```
  <div className="card-container">
          <div className="first-column">{beers}</div>
          <div className="second-column">
            {selectedBeer && (
              <BeerDescription beer={selectedBeer} key={selectedBeer.name} />
            )}
          </div>
        </div>
```

- I then moved on to fetching my API by using ‘this.state.malt’ at the end of my api link (for whatever the user types in), and storing the fetched data into my beerData., and passed that as a prop into my Beer.js as ‘beer’.

```
  handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.punkapi.com/v2/beers?malt=${this.state.malt}`;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        this.setState({ beerData: results });
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
```

- In Beer.js, I used the props passed from App.js to have my UI display the beer name, tagline and image. 

```
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

```

- In BeerDescription.js, I rendered the name, description, abv and image_url for an expanded view of the selected beer. 

```
<div className="card">
        <h3>{this.props.beer.name}</h3>
        <h5>{this.props.beer.description}</h5>
        <p>{this.props.beer.abv}</p>
        <img src={this.props.beer.image_url} className="image"></img>
      </div>
```

- I then continued working on the app functionality. As an example, I added a button in my Beer.js for deleting a selected beer, and then added the  handleDelete(this,props.beer) function passed down from App.js to delete that item.

```
   <button className="deleteBtn" onClick={this.handleDelete}>
            Delete
          </button>
```

```
  handleDelete = () => {
    this.props.handleDelete(this.props.beer);
  };
```

App.js ->

```
  handleDelete = (item) => {
    this.setState({
      beerData: this.state.beerData.filter((i) => i !== item),
    });
  };
```

```
 <div onClick={() => this.handleClick(item)} key={index}>
          <Beer
            isFave={this.state.favoriteList.includes(item)}
            beer={item}
            handleDelete={this.handleDelete}
            onFavoriteClick={() => {
              return this.updateFavoriteList(item);
            }}
          />
        </div>
```

- In App.js, I started adding extra functions such as adding a new beer and clearing the whole list. The ‘selectedBeer’ was added after this part when I started working on my Fave.js. 

```
  <button className="addNewItemBtn" onClick={this.addNewItem}>
            Add item
          </button>
          <button className="clearAllItemsBtn" onClick={this.clearList}>
            Clear ALL beers
          </button>
```

```
 clearList = () => {
    this.setState(
      {
        beerData: [],
      },
      () => {
        this.setState({
          selectedBeer: null,
        });
      }
    );
  };

  addNewItem = () => {
    const input = prompt("Enter a new beer name");
    const myNewBeer = {
      name: input,
      tagline: this.state.beerData[0].tagline,
      description: this.state.beerData[0].description,
      abv: <img src={this.state.beerData[0].image_url}></img>,
    };
    this.setState(
      { beerData: [myNewBeer].concat(this.state.beerData) },
      () => {}
    );
  };
```

- My last feature was favoriting a beer from the list and I did that by adding a new component Fave.js. I added ‘selectedBeer’ to my state and created a function handleClick to be able to favourite that item. I also added an empty favoriteList array and later on favoritesCount (to display nr of fav beers) to my state.

```
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      malt: "",
      beerData: [],
      selectedBeer: null,
      favoriteList: [],
      favoritesCount: 0,
    };
  }
```

- My biggest struggle was working with the Fave.js part of the app. I sought a lot of help on this part as the project due date was also approaching so anxiety was rising. I  have yet to go through all my code again in this regard and re-do it to really understand all of it. But in short, I created the updateFavoriteList function to update the state of a user’s favourites list, and count where a user adds or removes items from that list. The clearFavorite and clearList methods clear the user’s favourites list and the list of beers, respectively. 
My Fave component received props from the Beer component (passed down from App), including info about whether a beer is already in the list of favourites. Then the render method displays a button that allows users to add or remove a beer from their fave list. The button’s text is determined by whether the beer is favorited or not. 

```
 <div className="beerFave">
        <button
          className={`faveButton ${
            this.props.isFave ? "is-favorite" : "not-favorite"
          }`}
          onClick={this.handleClick}
        >
          {this.props.isFave ? "Remove from Fave" : "Add to Fave"}
        </button>
      </div>
    );
```

---

## 😅 Challenges

- This project felt super intense, to say the least, as we only had a week to learn and practice React before building an entire project by ourselves. Understanding the multiple components, and how they link up together, and also the nature of asynchronous state changes have been quite challenging. A fair amount was spent resolving issues in regards to those, but in the end, it does feel rewarding to have completed it regardless. I definitely, however, feel more practice is needed to really get that settled in my brain.
- Understanding what goes where, how the components are connected and also how APIs work was also one of the main issues, especially in regards to multiple CORS errors I was getting. I solved that by googling, stack overflowing and seeking help from peers and instructors. 

---


## 🏆 Wins


- Practiced retrieving data from an API and developing a better understanding of it works
- Got more comfortable using ReactJS by putting everything we learned in practice from scratch
- Got more practice into reading errors and fixing bugs in my own code

--- 

## Key Takeaways

I think there is still quite a long way to go for me to feel completely comfortable working with React. I definitely feel I need much more practice on this and my aim is to start practising it again by copying existing projects. Another thing I also need quite a lot of practice around is the APIs, and that probably feels even more challenging than React to me at the moment. 

--- 

#### ⭐️ Future improvements

- Styling - I would work some more on changing the layout, colours and the whole visual aspect of the app to have it more pleasing visually
- Using Local Storage to keep data locally - This would save the game history in cases that the page / computer crashes and the user has to rejoin it. 
- Make the app responsive so the game can be accessed from various devices such as phones, pads, etc


---
