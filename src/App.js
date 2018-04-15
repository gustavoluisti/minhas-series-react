import React, { Component, Fragment } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Series from './Series'
import Nav from './Nav'
import NewSeries from './NewSeries'
import EditSeries from './EditSeries'

//function-stateless components
const About = () => <section className="intro-section"><h1>Sobre</h1></section>

class App extends Component {
  
  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <div className="container">
            <Route exact path='/' component={Home} />
            <Route path='/series-edit/:id' component={EditSeries} />
            <Route path='/series/:genre' component={Series} />
            <Route exact path='/about' component={About} />
            <Route exact path='/new-series' component={NewSeries} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App;
