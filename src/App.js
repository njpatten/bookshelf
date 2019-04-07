import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import './App.css'

import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
      <Router>
        <div className="app">
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
          <Route path="/search" exact component={SearchPage} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
