import React, {useState} from "react";
import {Modal, show, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./css/MovieCard.css"

const API_img="https://image.tmdb.org/t/p/w500/";

function MovieCard({title, image, vote_average, movieId, movie, id}){
    
    
    //const [show, setShow] =useState(false);
    //const handleShow = () => setShow(true);
    //const handleClose = () => setShow(false); 
    
    return(
            <div className="movieCard mb-3 filter-drop" >
                <Link to={movie ? `/details/${movieId}` : `/TvDetails/${id}`}>
                    <img className="movieImg" src={image} alt={title} />
                </Link>
                <p className="movieAverage">{vote_average}</p>
            </div>

    )
}

export default MovieCard