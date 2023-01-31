import React,{useState, useEffect} from "react"
import Loading from "../Loader/Loading"
import MovieCard from "../MovieCard"
import { TvNavbar } from "./TvNavbar"
import {Button} from 'react-bootstrap';

export function TvSeries(){

    const api_key = "c9b77bcacc73e615cac9ff002be7f83a"
    const API_img="https://image.tmdb.org/t/p/w500/";
    const tv_today = `https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=en-US&page=1`
    const tv_popular = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
    const tv_topRated = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`
    const tv_genres = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=en-US`
    const tv_genres_filter = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=`
    const generosMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=`


    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("")
    const [serieTitle, setSerieTitle] = useState("")
    const [generos, setGeneros] = useState([])

    useEffect(() => {
        fetch(tv_popular)
        .then(response =>response.json())
        .then(data=>{console.log(data, "tv today")
            setSeries(data.results)
            setSerieTitle("Series Populares...")
            })
        .catch(err => console.log(err))
        .finally(() =>setLoading(false))
        }, [])

    useEffect(() => {
        fetch(tv_genres)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setGeneros(data.genres)
        })
        .catch(err => console.log(err))
        .finally(() =>setLoading(false))
    }, [])

        const seriesPopular = () => {
            setLoading(true)
            fetch(tv_popular)
            .then(response =>response.json())
            .then(data=>{console.log(data, "tv today")
                setSeries(data.results)
                setSerieTitle("Series Populares...")})
            .catch(err => console.log(err))
            .finally(() =>setLoading(false))
            }

        const seriesToday = () => {
            setLoading(true)
            fetch(tv_today)
            .then(response =>response.json())
            .then(data=>{console.log(data, "tv today")
                setSeries(data.results)
                setSerieTitle("Series en transmisión...")})
            .catch(err => console.log(err))
            .finally(() =>setLoading(false))
            }
        
        const seriesTopRated = () => {
            setLoading(true)
            fetch(tv_topRated)
            .then(response =>response.json())
            .then(data=>{console.log(data, "tv today")
                setSeries(data.results)
                setSerieTitle("Series mejor valoradas...")})
            .catch(err => console.log(err))
            .finally(() =>setLoading(false))
            
        }

    const changeHandler=(e)=>{
        setSearchName(e.target.value);
        console.log(searchName)
    }

    const searchSeries = (e)=>{
        e.preventDefault();
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=c9b77bcacc73e615cac9ff002be7f83a&query=${searchName}`)
        .then(data => data.json())
        .then(data=>{console.log(data, "buscando...")
            setSeries(data.results)
            setSearchName("")}
            )
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }
    const genreSearch = (id, genre) => {
        setLoading(true)
        fetch(tv_genres_filter+id)
        .then(response => response.json())
        .then(data => {
            console.log(data.results, "buscando por genero" + id)
            setSeries(data.results)
            setSerieTitle(genre)
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
}
    


    return(
        <>
            <TvNavbar 
                popular={seriesPopular}
                today={seriesToday}
                topRated={seriesTopRated}
                value={searchName}
                handleName={changeHandler}
                search={searchSeries}
            />
                <ul className="text-white d-flex flex-wrap gap-1 bg-color">
                    {generos.map((genero) => {
                        return(
                            <li key={genero.id} className="list-style-none">
                                <Button variant="warning" onClick={() => genreSearch(genero.id, genero.name)}>{genero.name}</Button>
                            </li>
                        )
                    })}
                </ul>
                {
                    loading ? 
                        <Loading />
                        :
                        <> 
                            <div className="bg-color">
                                <h3 className="color-fff">{serieTitle}</h3>
                                <div className="moviesContainer  d-flex justify-content-around aling-items-center flex-wrap gap-1">
                                    {
                                        series.map((movieResult) =>
                                            <MovieCard 
                                                key={movieResult.id}
                                                title={movieResult.original_title}
                                                image={API_img+movieResult.poster_path}
                                                vote_average={movieResult.vote_average}
                                                release_date={movieResult.release_date}
                                                overview={movieResult.overview}
                                                button={false}
                                                tv={true}
                                                id={movieResult.id}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </>
                }
        </>
    )
}