import React, { Component } from 'react'
import api from './Api'
import { Redirect, Link } from 'react-router-dom'
const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}


export default class EditSeries extends Component {
    constructor(props){
        super(props)
        this.state = {
        genres: [],
        isLoading: false,
        redirect: false,
        series:{}
        }

        this.saveSeries = this.saveSeries.bind(this)
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadSeriesById(this.props.match.params.id)
            .then((res)=>{
            this.setState({ series: res.data })
            this.refs.name.value = this.state.series.name
            this.refs.genre.value = this.state.series.genre
            this.refs.comments.value = this.state.series.comments
            this.refs.status.value = this.state.series.status
        })
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
        <span>&nbsp;<a href=''>{genre}</a>&nbsp;</span>
        )
    }
    saveSeries(){
        const newSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.updateSeries(newSeries)
        .then((res)=>{
            this.setState({
                redirect: '/series/'+this.refs.genre.value
            })
        })
        
    }
    render() {
        return(
            
            <section className="intro-section" >
                { this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
              <h1>Novas series</h1>  

              <form>
                Nome: <input type="text" ref='name' defaultValue={this.state.series.name} className="form-control" /><br />
                Status: <select ref='status'>
                            { Object
                                .keys(statuses)
                                .map( key =>
                                 <option key={key} value={key}>{statuses[key]}</option> )}
                        </select><br /><br />
                Gênero: <select ref='genre' >
                    { this.state.genres
                        .map( key =>
                         <option key={key} value={key}>{key}</option> )}
                </select><br /><br />
                Comentários:<textarea ref='comments' className="form-control"></textarea><br />
                <button type="button" onClick={this.saveSeries} >Salvar</button>
              </form>
            </section>
        )
    }
}