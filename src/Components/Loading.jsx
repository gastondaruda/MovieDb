import React from "react";
import "./css/loading.css";
import popcorn from "../imagenes/popcorn.png"

function Loading(){
    return(
        <div className='container'>
            <img className="loading_img" src={popcorn} alt="loading"/>
        </div>
    )
}

export default Loading