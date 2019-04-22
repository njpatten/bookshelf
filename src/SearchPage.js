import React from 'react'
import { Link } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'

import Book from './Book'

class SearchPage extends React.Component {
  state = {
    searchTerm: '',
    booksSearchable: [],
    myBooks: [],
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    }, this.searchBooks);
  }

  changeShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then(this.resetSearch()).then(this.props.history.push('/'));
  }

  resetSearch = () => {
    this.setState({
      searchTerm: ''
    }, this.searchBooks);
  }

  searchBooks = () => {
    BooksAPI.search(this.state.searchTerm)
      .then((results) => (
        results && results.length ? 
          this.setState({booksSearchable: results}) 
        : this.setState({booksSearchable: []})
      ))
  }

  findShelf = (book) => {
    let foundBook = this.state.myBooks.find(myBook => myBook.id === book.id)
    if (foundBook){
      return foundBook.shelf
    }
    else return 'none'
  }

  componentDidMount = () => {
    this.getMyBooks();
  }

  getMyBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({myBooks: books}));
  }

  render() {
    const { booksSearchable } = this.state;

    return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to=''>
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={this.handleChange} />

        </div>
      </div>
      <div className="search-books-results">
          <ol className="books-grid">
            {booksSearchable.map(book => 
             <li key={book.id}>
              <Book
                thumbnail={book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'https://via.placeholder.com/350x150'}
                title={book.title}
                authors={book.authors}
                shelf={this.findShelf(book)}
                bookID={book.id}
                changeShelf={(shelf) => this.changeShelf(shelf, book)}
              />
             </li>
            )}
            </ol>
      </div>
    </div>
    )
  }
}

export default SearchPage
