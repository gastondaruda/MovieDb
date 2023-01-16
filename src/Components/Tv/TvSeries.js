import React,{useState, useEffect} from "react"
import Loading from "../Loader/Loading"
import MovieCard from "../MovieCard"
import { TvNavbar } from "./TvNavbar"

export function TvSeries(){

    const api_key = "c9b77bcacc73e615cac9ff002be7f83a"
    const tv_today = `https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=en-US&page=1`
    const tv_popular = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
    const tv_topRated = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1` 

    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(tv_popular)
        .then(response =>response.json())
        .then(data=>{console.log(data, "tv today")
            setSeries(data.results)
            setLoading(false)})
        }, [])

        const seriesPopular = () => {
            setLoading(true)
            fetch(tv_popular)
            .then(response =>response.json())
            .then(data=>{console.log(data, "tv today")
                setSeries(data.results)
                setLoading(false)})
            }

        const seriesToday = () => {
            setLoading(true)
            fetch(tv_today)
            .then(response =>response.json())
            .then(data=>{console.log(data, "tv today")
                setSeries(data.results)
                setLoading(false)})
            }
        
        const seriesTopRated = () => {
            setLoading(true)
            fetch(tv_topRated)
            .then(response =>response.json())
            .then(data=>{console.log(data, "tv today")
                setSeries(data.results)
                setLoading(false)})    
        }


    return(
        <>
            <TvNavbar 
                popular={seriesPopular}
                today={seriesToday}
                topRated={seriesTopRated}
            />
                {
                    loading ? 
                        <Loading />
                        : 
                        <div className="moviesContainer">
                            {
                                series.map((movieResult) =>
                                    <MovieCard 
                                        key={movieResult.id}
                                        title={movieResult.original_title}
                                        image={movieResult.poster_path}
                                        vote_average={movieResult.vote_average}
                                        release_date={movieResult.release_date}
                                        overview={movieResult.overview}
                                    />
                                )
                            }
                        </div>
                }
        </>
    )
}