import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
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

  searchBooks = () => {
    BooksAPI.search(this.state.searchTerm)
      .then((results) => this.setState({booksSearchable: results || []}))
      .catch(() => console.log('error'));
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
        {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
        */}
        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={this.handleChange} />

        </div>
      </div>
      <div className="search-books-results">
          <ol className="books-grid">
            {booksSearchable.map(book => 
             <li>
              <Book
                thumbnail={book.imageLinks.thumbnail}
                title={book.title}
                authors={book.authors}
                shelf={book.shelf}
                bookID={book.id}
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
