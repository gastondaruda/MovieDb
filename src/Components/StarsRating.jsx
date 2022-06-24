import React,{useState} from "react";
import {Link} from "react-router-dom";
import {FaStar} from "react-icons/fa";
import "./css/starRating.css";


function StarsRating(){
    const [rating, setRating] = useState(null);

return(
        <>
        <div>
                        {[...Array(5)].map((start, i) => {
                            const ratingValue = i + 1;

                            return (
                                
                                <label>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={ratingValue}
                                        onClick={() => {setRating(ratingValue); }}
                                        id={ratingValue}
                                        />
                                    <Link to="/MovieFilteredContainer">
                                        <FaStar 
                                            className="star" 
                                            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                                            onClick={() => console.log("hola")}
                                        />
                                    </Link>
                            </label>
                            )
                        })}
                        </div>
                    </>
    )
}

export default StarsRating