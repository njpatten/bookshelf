import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import SearchPage from './SearchPage'
import ListBooksPage from './ListBooksPage'
import './App.css'


class BooksApp extends React.Component {

  render() {

    return (
      <Router>
        <div className="app">
          <Route path="/" exact component={ListBooksPage} />
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
