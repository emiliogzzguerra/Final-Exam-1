import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      books: []
    }
  }

  makeApiCall = (searchTerm) => {
    const settings = {
      method: 'GET',
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`, settings).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error("Something went wrong...");
      }
    }).then(response => {
      this.setState({ books : response.items})
    }).catch(err => {
      throw Error("Something went wrong...");
    })
  }

  render(){
    const { books } = this.state;
    return(
      <div>
        <BookForm handleSubmit={this.makeApiCall}/>
        {books.map(book => (
          <Book title={book.volumeInfo.title} thumb={book.volumeInfo.imageLinks.smallThumbnail} author={book.volumeInfo.authors[0]} textSnippet={book.volumeInfo.description} />
        ))}
      </div>
    )
  }

}

export default App;
