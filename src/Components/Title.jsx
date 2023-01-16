import React from 'react';
import { Link } from "react-router-dom";
import "./css/navbar.css"

function Title() {
    return (
            <div className="Navbar d-flex justify-content-between flex-row align-items-center p-2">
                <Link to="/" className="link">
                    <h3 className="text-light">The Movie Db</h3>
                </Link>
                <h3 className="text-light align-items-center">Gastón Da Ruda Frontend-Developer</h3>
            </div>
            )
        }

export default Title