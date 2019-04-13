import React from 'react'

class Book extends React.Component {
  state = {
    selectedShelf: '',
  }


  handleChange = (event) => {
    let newShelf = event.target.value;
    this.props.changeShelf(newShelf);
  }


  render() {
    const { thumbnail, title, authors, shelf } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf ? shelf : 'none'} onChange={(event) => this.handleChange(event)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors && authors.length ? <div className="book-authors">{authors.join(', ')}</div> : null}
      </div>
    )
  }
}

export default Book
