import React from 'react'
import Book from './Book'


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
                <li key={book.id}>
                  <Book
                    thumbnail={book.imageLinks.thumbnail || 'https://via.placeholder.com/350x150'}
                    title={book.title}
                    authors={book.authors}
                    shelf={book.shelf}
                    bookID={book.id}
                    changeShelf={(shelf) => this.changeShelf(shelf, book)}
                    displayAuthors={true}
                    displayControls={true}
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
