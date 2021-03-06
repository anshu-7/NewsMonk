import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country : "in",
        page : 8,
        category : "general"
    } 

    static propTypes = {
        country : PropTypes.string,
        page : PropTypes.number,
        category : PropTypes.string
    } 

    constructor(){
        super();
        console.log("Inside Constructor")
        this.state = {
            articles : [],
            loading : false,
            page : 1
        }
        
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=979564b7bfad48dd8fe7b2c8b8e4ef8b&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);

        let parsedData = await data.json();

        this.setState({articles : parsedData.articles, loading: false})

        // console.log(parsedData);
    }

    handleNextClick = async ()=>{

        console.log("next");

        if( this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize) ){}
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=979564b7bfad48dd8fe7b2c8b8e4ef8b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles : parsedData.articles,
            page : this.state.page + 1,
            totalResults : parsedData.totalResults,
            loading: false
        })
        }

    }
    handlePrevClick = async ()=>{
        console.log("prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=979564b7bfad48dd8fe7b2c8b8e4ef8b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles : parsedData.articles,
            page : this.state.page - 1,
            totalResults : parsedData.totalResults,
            loading: false
        
        })
    }


    render() {

        return (
            <div className='container'>
                <h1 className = 'text-center'>NewsMonkey - Top Headings</h1>
                {this.state.loading && <Spinner/>}
                <div className='row'>

                    {!this.state.loading && this.state.articles.map((element)=>{
                        return(
                        <div className='col-md-4'  key = {element.url}>
                        <NewsItem title = {element.title} description = {element.description} imageURL = {element.urlToImage} 
                        newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>   
                        </div> 
                        )     
                    })}
                  

                </div>
                <div className='container d-flex justify-content-between'>
                     <button disabled = {this.state.page <= 1} type="button" class="btn btn-dark" onClick = {this.handlePrevClick}>&larr; Previous</button>
                     <button disabled = {this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick = {this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
