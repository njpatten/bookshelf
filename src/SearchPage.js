import React from 'react'
import { Link } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'

import Book from './Book'

class SearchPage extends React.Component {
  state = {
    searchTerm: '',
    booksSearchable: []
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
                shelf={book.shelf}
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
