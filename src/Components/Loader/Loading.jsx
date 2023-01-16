import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import "../css/loading.css"

function Loading(){
    return(
        <div className="loaderComponent">
            <Spinner className="d-flex justify-content-center align-items-center" animation="border" variant="warning">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        
    )
}

export default Loading


/*
<div className='container'>
            <img className="loading_img" src={popcorn} alt="loading"/>
        </div>
 */