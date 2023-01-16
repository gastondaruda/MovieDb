import React, {useState} from "react";
import {Modal, show} from 'react-bootstrap';
import "./css/MovieCard.css"

const API_img="https://image.tmdb.org/t/p/w500/";

function MovieCard({title, image, vote_average, release_date, overview, getId}){
    
    const [show, setShow] =useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false); 
    
    return(
            <div className="movieCard">
                {/*<h3 className="movieTitle">{title}</h3>*/}
                <img className="movieImg" src={API_img+image} alt={title} onClick={handleShow}/>
                <p className="movieAverage">{vote_average}</p>
                <h6 className="text-light">{release_date}</h6>
                {/*<button onClick={handleShow} className="text-light btn-detail">Ver más</button>
                <button onClick={getId}>Id</button>*/}
                <Modal show={show} onHide={handleClose} className="text-light modal">
                    <Modal.Header>
                        <Modal.Title>
                            <Modal.Title><h3>{title}</h3></Modal.Title>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className="img_modal" src={API_img+image} alt={title}/>
                        <p>{overview}</p>
                        <p className="movieAverage">{vote_average}</p>
                        <h5>{release_date}</h5>
                    </Modal.Body>
                </Modal>
            </div>

    )
}

export default MovieCard