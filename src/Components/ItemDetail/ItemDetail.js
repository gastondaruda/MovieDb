import React,{ useEffect, useState} from "react"
import { useParams } from "react-router"
import Loading from "../Loader/Loading"
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import MovieCard from "../MovieCard"
import Profile from "./Profile";
import YouTube from "react-youtube"
import "../css/itemDetails.css";

export default function ItemDetails(){
    const {id} = useParams();
    
    const [movie , setMovie] = useState({})
    //const [alternativeTitle, setAlternativeTitle] = useState([])
    const [justWatch, setJustWatch] = useState([])
    const [movieVideo, setMovieVideo] = useState([])
    const [genre, setGenre] = useState([])
    const [credits, setCredits] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [youtubeLoading, setYoutubeLoading] = useState(false)

    const API_img="https://image.tmdb.org/t/p/w500/";
    const api_key = "c9b77bcacc73e615cac9ff002be7f83a"
    const movieId =` https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    const movie_justwatch = ` https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${api_key}`
    const movie_video = ` https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`
    //const alternative_title = ` https://api.themoviedb.org/3/movie/${id}/alternative_titles?api_key=${api_key}`
    const creditsId = ` https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`
    const similar_movies = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=en-US&page=1`
    const reviews_movies = ` https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`
    

    useEffect(() => {
        setLoading(true)
        
        fetch(movieId)
        .then(response => response.json())
        .then(data => {
            console.log(data, "data")
            console.log(data.genres, "Generos de la pelicula")
            setMovie(data)
            setGenre(data.genres)
        })
        .catch(err => console.log(err))

        setYoutubeLoading(true)
        fetch(movie_video)
        .then(response => response.json())
        .then(data => {
            console.log(data.results, "movie video")
            setMovieVideo(data.results.find((item ) => item.type.includes("Trailer")))
        })
        

        fetch(movie_justwatch)
        .then(response => response.json())
        .then(data => {
            console.log(data.results.AR.flatrate , "justwatch")
            setJustWatch(data.results.AR.flatrate)
        })
        .catch(err => console.log(err))
        
        fetch(creditsId)
        .then(response =>  response.json())
        .then(data => {
            console.log(data.cast, "cast")
            setCredits(data.cast)
        })
        .catch(err => console.log(err))

       {/* fetch(alternative_title)
        .then(response => response.json())
        .then(data => {
            console.log(data.titles, "array")
            console.log(data.titles.find((t) => t.iso_3166_1  === "ES").title, "Resultado posta")
        }) */}


        fetch(reviews_movies)
        .then(response => response.json())
        .then(data => {
            console.log(data, "reviews")
            setReviews(data.results)
        })

        fetch(similar_movies)
        .then(response => response.json())
        .then(data => {
            console.log(data.results , "similar movie")
            setSimilarMovies(data.results)
        })
        .catch(err => console.log(err))
        
        .finally(() => {
            setLoading(false)
            setYoutubeLoading(false)
        })
    }, [movieId,creditsId,movie_justwatch,movie_video,reviews_movies,similar_movies])

    return(
        <> 
            {
                loading 
                    ? 
                        <Loading/> 
                    :
                    <>
                        <Container style={{ 
                            backgroundImage: `url(${API_img+movie.backdrop_path}!important)`
                            }} className="padd padding-right bg-color">
                            <Row className="justify-content-center pt-5" style={{ 
                                backgroundImage: `url(${API_img+movie.backdrop_path})`,
                                backgroundSize: "conver" }}>
                                <Col xs={12} md={6} className="d-flex justify-content-center">
                                    <img className="img_detail filter-drop" src={API_img+movie.poster_path} alt={movie.original_title} />
                                    
                                </Col>
                                <Col xs={12} md={6} className="align-items-center margin-auto">
                                    <Button variant="warning" className="text-white">Trailer</Button>
                                                {
                                                youtubeLoading ?
                                                <Loading />
                                                :
                                                <YouTube 
                                                videoId={movieVideo.key}                  // defaults -> ''
                                                id={movieVideo.key}
                                                className={"w-100"}     
                                            />
                                            }
                                    
                                </Col>
                            </Row>
                        <Row>
                            <Col xs={12} className="pt-4">
                                <div className="d-flex flex-column -align-items-center justify-content-center">
                                    <h3 className="text-warning">{movie.original_title}</h3>
                                    <div className="mb-3 d-flex align-items-center justify-content-start gap-2">
                                            {
                                                justWatch === undefined ? 
                                                <h3 className="text-white">Lo sentimos, lo está disponible está peli en tu zona</h3>
                                                : 
                                                justWatch.map((item) =>
                                                    <img className="justwatch_logo" src={API_img+item.logo_path} alt={item.provider_name} />)
                                            }
                                        </div>
                                    <span className="text-white">{movie.release_date}</span>
                                    {/*<h5 className="text-white">
                                        {
                                            alternativeTitle.find((t) => t.iso_3166_1 === "ES").title
                                        }
                                    </h5>*/}
                                    <p className="text-white">{movie.overview}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={12}>
                                    <p className="text-white text-uppercase">Géneros: </p>
                                            <ul className="text-white list-style-none d-flex gap-2 flex-wrap">
                                                {
                                                    genre.map((genero) => <li><Button variant="warning" className="text-white">{genero.name}</Button></li> )
                                                }
                                            </ul>
                                </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                            <h5 className="text-white text-uppercase font-bold">Cast</h5>
                            <div className="d-flex flex-wrap gap-3 text-white justify-content-around profile">
                                            {
                                                credits.slice(0,9).map((person) => 
                                                    <Profile 
                                                        key={person.name}
                                                        name={person.name}
                                                        id={person.id}
                                                        img={ person.profile_path ? API_img+person.profile_path : "https://bitslog.files.wordpress.com/2013/01/unknown-person1.gif"}
                                                        
                                                    />
                                                )
                                            }
                                        </div>
                            </Col>
                        </Row>
                        <Row xs={12} md={12}>
                            <footer className="d-flex flex-column mt-3">
                                <h3 className="text-warning text-uppercase">Similar Movies</h3>
                                <div className="d-flex flex-wrap justify-content-around align-items-center gap-1">
                                    {
                                        similarMovies.map((movieResult) => 
                                        <MovieCard 
                                            key={movieResult.id}
                                            title={movieResult.original_title}
                                            image={API_img+movieResult.poster_path}
                                            vote_average={movieResult.vote_average}
                                            release_date={movieResult.release_date}
                                            movieId={movieResult.id}
                                            movie={true}
                                            tv={false}
                                        />
                                        )
                                    }
                                </div>
                            </footer>   
                        </Row>
                        <Row  xs={12} md={12}>
                            <div className="d-flex flex-wrap text-white flex-column mb-2">
                                <h3 className="text-warning text-uppercase">Reviews</h3>
                                <div classname="d-flex flex-column">
                                    {
                                        reviews === undefined  ||  reviews.length === 0 ? <h3 className="text-white">No hay reseñas</h3>
                                        : 
                                        reviews.map((review) => 
                                            <Card className="bg-color overflow-auto reviews-movie">
                                                <Card.Body>
                                                    <Card.Title className="text-warning">{review.author}</Card.Title>
                                                    <Card.Text>
                                                        {review.content}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        )
                                    }
                                </div>
                            </div>
                        </Row>
                        </Container>
                    </>
            }
        </>
    )
}