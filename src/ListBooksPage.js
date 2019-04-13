import React from 'react'
import { Link } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'


import BookShelf from './BookShelf'

class ListBooksPage extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.getBooks();
  }

  updateShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then(this.getBooks());
  }

  componentDidUpdate(){
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({books: books}));
  }

  render() {
    const { books } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf 
            books={books.filter(book => book.shelf === 'currentlyReading')}
            shelf='currentlyReading'
            title='Currently Reading'
            updateShelf={this.updateShelf}
          />
          <BookShelf 
            books={books.filter(book => book.shelf === 'wantToRead')}
            shelf='wantToRead'
            title='Want to Read'
            updateShelf={this.updateShelf}
          />
          <BookShelf
            books={books.filter(book => book.shelf === 'read')}
            shelf='read'
            title='Read'
            updateShelf={this.updateShelf}
          />
        </div>
            
        <div className="open-search">
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooksPage
