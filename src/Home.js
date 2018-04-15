import React, { Component } from 'react';
import api from './Api'
import { Link } from 'react-router-dom'

export default class Home extends Component{
        constructor(props){
            super(props)
            this.state = {
            genres: [],
            isLoading: false
            }
        }

        componentDidMount() {
            this.setState({ isLoading: true })
            api.loadGenres()
            .then((res)=>{
                this.setState({
                isLoading: false,
                genres: res.data
                })
            })
        }
        renderGenreLink(genre){
            return (
            <span key={genre} >&nbsp;<Link to={`/series/${genre}`}>{genre}</Link>&nbsp;</span>
            )
        }
    render(){
        return(
            <div>
                 <section className="home mt-4">
        <h2>Bem-vindo!</h2>
        <p>Escolha um gênero para ver suas séries.</p>
        <div>
          {
            this.state.isLoading &&
            <span>Carregando...</span>
          }
        </div>

        <div>
          {
           !this.state.isLoading &&
            <div>
              {
               this.state.genres.map(this.renderGenreLink)
              }
            </div>
          }
        </div>
      </section>
            </div>
        )
    }
}