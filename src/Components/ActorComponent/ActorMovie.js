import React,{useEffect, useState} from "react"
import { useParams } from "react-router"
import Loading from "../Loader/Loading"
import MovieCard from "../MovieCard"
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./actor.css"

export default function Actor(){

    const {idActor} = useParams()
    const [actor, setActor] = useState([])
    const [actorTv, setActorTv] = useState([])
    const [allActor, setAllActor] = useState([])
    const [actorInfo, setActorInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const api_key = "c9b77bcacc73e615cac9ff002be7f83a"
    const actor_api = `https://api.themoviedb.org/3/person/${idActor}/movie_credits?api_key=${api_key}`
    const actor_tv = `https://api.themoviedb.org/3/person/${idActor}/tv_credits?api_key=${api_key}`
    const actor_info = `https://api.themoviedb.org/3/person/${idActor}?api_key=${api_key}&append_to_response=credits`
    const API_img="https://image.tmdb.org/t/p/w500/";


    useEffect(() => {
        setLoading(true)
        fetch(actor_api)
        .then(response => response.json())
        .then(data =>  {
            console.log(data.cast, "actor info")
            setActor(data.cast)
        })
        .catch(err => console.log(err))

        fetch(actor_info)
        .then(response => response.json())
        .then(data =>{
            console.log(data, "actor info")
            setActorInfo(data)
        })
        .catch(err => console.log(err))

        fetch(actor_tv)
        .then(response => response.json())
        .then(data => {
            console.log(data.cast , "actor tv")
            setActorTv(data.cast)
            setAllActor(actor.concat(actorTv))
        })

        .finally(() => setLoading(false))
    }, [actor_api, actor_info, actor_tv])

    return(
        <>
            {
                loading 
                    ? 
                    <Loading />
                    :
                    <>
                        <Container className="bg-color">
                        <Row>
                            <Col xs={12} lg={6} className="flex-column justify-content-center d-flex">
                                <img className="actor_info_profile" src={API_img+actorInfo.profile_path} alt={actorInfo.name}/>
                                <span className="text-white">Birthday {actorInfo.birthday}</span>
                            </Col>
                            <Col xs={12} lg={6} className="pt-4 pb-4">
                                <h3 className="text-warning text-uppercase ">{actorInfo.name}</h3>
                                <div className="overflow-auto actor-biography">
                                    <p className="text-white text-justify">{actorInfo.biography}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={12}>
                                <h3 className="text-warning text-uppercase pt-5">Películas de {actorInfo.name}</h3>
                            </Col>
                            <Col xs={12} lg={12}>
                                <div className="w-100 d-flex flex-wrap justify-content-around aling-items-center">
                                {
                                actor.sort(function(a,b){return b.vote_average - a.vote_average}).map((movieResult) =>
                                    <MovieCard 
                                        key={movieResult.id}
                                        title={movieResult.original_title}
                                        image={ movieResult.poster_path === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAktDnv9vHbnuXA_xznHIZZ-BiLaNUPnCDiA&usqp=CAU" :  API_img + movieResult.poster_path }
                                        vote_average={movieResult.vote_average}
                                        release_date={movieResult.release_date}
                                        overview={movieResult.overview}
                                        movieId={movieResult.id}
                                        movie={true}
                                        tv={false}
                                        />
                                    )
                                }
                                </div>
                            </Col>
                            <Col xs={12} lg={12}>
                                <h3 className="text-warning text-uppercase pt-5">Series de {actorInfo.name}</h3>
                            </Col>
                            <Col xs={12} lg={12}>
                                <div className="w-100 d-flex flex-wrap justify-content-around aling-items-center">
                                {
                                actorTv.sort(function(a,b){return b.vote_average - a.vote_average}).map((movieResult) =>
                                    <MovieCard 
                                        key={movieResult.id}
                                        title={movieResult.original_title}
                                        image={ movieResult.poster_path === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAktDnv9vHbnuXA_xznHIZZ-BiLaNUPnCDiA&usqp=CAU" :  API_img + movieResult.poster_path }
                                        vote_average={movieResult.vote_average}
                                        release_date={movieResult.release_date}
                                        overview={movieResult.overview}
                                        movieId={movieResult.id}
                                        movie={false}
                                        id={movieResult.id}
                                        />
                                    )
                                }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    </>
                        
        }
    </>
    )
}