import React,{useState , useEffect} from "react"
import { useParams } from "react-router"
import Loading from "../Loader/Loading"
import CardSeason from "./CardSeason"


export default function SerieSeasonNumber(){

    
    const {tv_id, season_number} = useParams()
    const [episodes, setEpisodes] = useState([])
    const [ep , setEp] = useState({})
    const api_key = "c9b77bcacc73e615cac9ff002be7f83a"
    const serie_season = `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=${api_key}&language=en-US`
    const API_img="https://image.tmdb.org/t/p/w500/";


    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(serie_season)
        .then(response => response.json())
        .then(data => {
            console.log(data.episodes, "season episodes")

            setEpisodes(data.episodes)
            setEp(data)
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [serie_season])

    return(
        <>
            {
                loading ? 
                    <Loading />
                :
                <div className="padd padding-right bg-color">
                    <h3 className="text-warning text-capitalize">Temporada: {season_number}</h3>
                    <div className="text-white w-100 d-flex flex-wrap justify-content-around align-items-stretch">
                        {
                            episodes.map((episode) =>
                                    <CardSeason
                                        episode_number={episode.episode_number} 
                                        name={episode.name} 
                                        still_path={episode.still_path === null ? ep.poster_path : episode.still_path} 
                                        overview={episode.overview}
                                        epDd={episode.episode_number}
                                    />
                            )
                        }
                    </div>
                </div>
            }
        </>
    )
}