import React,{useState, useEffect} from "react";
import { useParams } from "react-router"
import Loading from "../Loader/Loading";
import Acordion from "./Acordion";
import MovieCard from "../MovieCard"
import {Card, Button, Container, Row, Col,} from 'react-bootstrap';
import "./serieDetail.css"

export default function SeriesDetail(){
    const {id} = useParams();
    const [loading, setLoading] = useState(false)
    const [tv, setTv] = useState({})
    const [season, setSeason] = useState([])
    const [similarMovie, setSimilarMovie] = useState([])
    const [reviews, setReviews] = useState([])
    const [tvJustwatch, setTvJustwatch] = useState({})



    const api_key = "c9b77bcacc73e615cac9ff002be7f83a";
    const API_img="https://image.tmdb.org/t/p/w500/";
    const serie_api = ` https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`
    const similar_series = ` https://api.themoviedb.org/3/tv/${id}/similar?api_key=${api_key}&language=en-US&page=1`
    const reviews_tv = ` https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${api_key}&language=en-US&page=1`
    const tv_justwatch = ` https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${api_key}`

    useEffect(() => {
        setLoading(true)
        fetch(serie_api)
        .then(response => response.json())
        .then(data => {
            console.log(data , "serie id")
            setTv(data)
            console.log(data.seasons, "seasons")
            setSeason(data.seasons)
        })
        .catch(err => console.log(err))

        fetch(similar_series)
        .then(response => response.json())
        .then(data => {
            console.log(data.results, "similar series")
            setSimilarMovie(data.results)
        })
        .catch(err =>  console.log(err))

        fetch(reviews_tv)
        .then(response => response.json())
        .then(data => {
            console.log(data.results, "reviews")
            setReviews(data.results)
        })
        .catch(err =>  console.log(err))

        fetch(tv_justwatch)
        .then(response => response.json())
        .then(data => {
            console.log(data.results.AR.flatrate, "tv justwatch")
            setTvJustwatch(data.results.AR.flatrate)
        })
        .catch(err => console.log(err))

        .finally(() => setLoading(false))
    }, [serie_api,similar_series,reviews_tv,tv_justwatch])


    return(
        <>
            {
                loading ? 
                <Loading />
                :
                
                <Container className="padd padding-right bg-color" fluid >
                    <Row className="" style={{ 
                    backgroundImage: `url(${API_img+tv.backdrop_path})`,
                    backgroundSize: "conver",


            
                }}>
                        <Col xs={12} lg={6} className="d-flex justify-content-center align-items-center margin-auto">
                            <img className="rounded img_tv-detail rounded filter-drop" src={API_img+tv.poster_path} alt={tv.name}/>
                        </Col>
                        <Col xs={12} lg={6} className="justify-content-center align-items-center h-100 margin-auto">
                            <div className="w-100">
                                {
                                    season.map((season) => 
                                    <Acordion
                                        key={season.name}
                                        tv_season={season.name}
                                        air_date={season.air_date}
                                        episode_count={season.episode_count}
                                        overview={season.overview}
                                        poster_path={season.poster_path}
                                        tv_id={id}
                                        season_number={season.season_number}
                                        className="bg-color"
                                    />)
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row className="pt-4">
                        <Col xs={12} lg={12}>
                            <div>
                                {
                                    tvJustwatch === undefined ? 
                                        <h3 className="text-white">Lo sentimos, lo está disponible está peli en tu zona</h3>
                                        : 
                                        tvJustwatch.map((item) =>
                                        <img className="justwatch_logo" src={API_img+item.logo_path} alt={item.provider_name} />)
                                }
                            </div>
                            <h3 className="text-warning text-uppercase">{tv.name}</h3>
                            <p className="text-white text-justify">{tv.overview}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3 bg-color">
                        <Col xs={12} md={12}>
                                <div className="text-white">
                                    <h3 className="text-warning">Reviews</h3>
                                    <div className="d-flex flex-column bg-color overflow-auto">
                                    {
                                        reviews.map((review) =>
                                        <> 
                                            <Card className="bg-color overflow-auto reviews-card">
                                                <Card.Body>
                                                    <Card.Title className="text-warning">{review.author}</Card.Title>
                                                    <Card.Text className="font-italic">
                                                        {review.content}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </>)
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="d-flex flex-column w-100 mt-3 ">
                            <h3 className="text-warning text-uppercase">Similar Tv series</h3>
                                <div className="d-flex w-100 align-items-center justify-content-around flex-wrap">
                                    {
                                        similarMovie.map((serie) => 
                                        <MovieCard 
                                            key={serie.id}
                                            title={serie.original_title}
                                            image={API_img+serie.poster_path}
                                            vote_average={serie.vote_average}
                                            release_date={serie.release_date}
                                            id={serie.id}
                                            movie={false}
                                            tv={true}
                                            />)
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}