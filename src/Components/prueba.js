import React from "react"
import Button from 'react-bootstrap/Button';

export function Prueba({prueba, id, genresSearch}){
    return(
        <Button variant="warning" className="text-white" id={id} onClick={genresSearch}>{prueba}</Button>
    )
}