import React, { Component } from 'react'
import api from './Api'
import { Redirect, Link } from 'react-router-dom'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir',
}

export default class Series extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            series: []
        }

        this.renderSerieGenre = this.renderSerieGenre.bind(this)
        this.deleteSeries  = this.deleteSeries.bind(this)
        this.loadData   = this.loadData.bind(this)
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.setState({ isLoading: true })
        api.loadSeriesGenre(this.props.match.params.genre).then((res)=>{
            this.setState({
                isLoading:false,
                series: res.data
            })
        })
    }
    deleteSeries(id){
        api.deleteSeries(id).then((res)=> this.loadData())
    }

    renderSerieGenre (series) {
        return (
        <div key={series.id} class="item col-xs-4 col-lg-4">
            <div className="card mb-4 bg-dark">
              <img className="card-img-top" src="/assets/images/img.svg"  />
              <div className="card-body">
                <h5 className="card-title">
                    {series.name}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{series.genre}</h6>
                <p className="card-text">{statuses[series.status]}</p>
                <Link className="btn btn-success" to={'/series-edit/'+series.id} >Editar</Link>
                <a className="btn btn-danger" onClick={() => this.deleteSeries(series.id) } >Excluir</a>
              </div>
            </div>
        </div>
        )
      }


    render(){
        return(
            <section id="intro" className="intro-section">
               <h1>Series de {this.props.match.params.genre} </h1> 
                   {
                       this.state.isLoading &&
                       <p>Carregand, aguarde...</p>
                   } 
                   {
                        !this.state.isLoading &&  this.state.series.length === 0 &&
                       <div className='alert alert-info'>Nenhuma série cadastrada, cadastre a sua série :) e monte o seu setlist de séries</div>
                   }
                <div id="series" className="row list-group" >
                    {!this.state.isLoading && 
                      this.state.series.map(this.renderSerieGenre)
                      }
                </div>
            </section>
        )
    }
}