# Beer React App

#### Description

---

This is a React App where a user can search for their most loved beers within a beer list, favorite them, and edit the list.

#### Links

---

###### Wireframe

![](https://imgur.com/Dm1CgqZ.png)

[App Link](https://63d2b7795c17b9127500585b--sage-crepe-00e0db.netlify.app/)

#### Technology

---

- ReactJS
- JSX
- API
- CSS
- Git
- GitHub
- Fontawesome

#### User Stories

---

- As a user, I can search through a list of beers
- As a user, I can add a new beer item to the list
- As a user, I can mark a beer/ multiple beers as favorite
- As a user, I can unfavorite beer / beers
- As a user, I can clear only the favorite beers list
- As a user, I can remove a beer from the list
- As a user, I can delete all beers from the list / clear the list

#### Approach

---

This app is built in ReactJS, using four components, and data from an external API.
Various API urls were tested before picking `https://api.punkapi.com/v2/beers?malt=pale`, that contains an array of objects.

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

Map() method was then used to iterate over the array and get the data.

```
  render() {
    const beers = this.state.beerData.map((item, index) => {
      return (
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
      );
    });
```

#### 🏆 Wins

---

- Practiced retrieving data from an API and developing a better understanding of it works
- Got more comfortable using ReactJS by putting everything we learned in practice from scratch
- Got more practice into reading errors and fixing bugs in my own code

#### 😅 Challenges

---

- This project felt super intense, to say the least, as we only had a week to learn and practice React before building an entire project by ourselves. But it does feel rewarding to have completed it regardless
- Understanding what goes where, how the components are connected and also how APIs work were the main issue.

#### ⭐️ Future improvements

---

- Styling
- Using Local Storage to keep data locally
- Using React component libraries
- Make the app responsive
