import React from 'react'
// import * as BooksAPI from './BooksAPI'
import Book from './Book'
import BooksApp from './App';

class BookShelf extends React.Component {

  changeShelf = (shelf, book) => {
    this.props.updateShelf(shelf, book)
  }

  render() {
    const { books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            
              {books.map(book => 
                <li>
                  <Book
                    thumbnail={book.imageLinks.thumbnail}
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

export default BookShelf
