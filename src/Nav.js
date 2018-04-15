import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link to="/" className="navbar-brand">Minhas Series</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Início</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/new-series" className="nav-link">Nova Série</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link">Sobre</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav> 
        )
    }
}