import React from "react"
import { Link } from 'react-router-dom';
import "./profile.css"

export default function Profile({img, name, id}){
    return(
        <div className="profile_container d-flex align-items-center flex-column bg-color">
            <img className="profile_img" src={img} alt={name}/>
            <Link to={`/actor/${id}`}>
                <h6 className="profile_name">{name}</h6>
            </Link>
        </div>
    )
}