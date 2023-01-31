import {Container, Button, Nav, Navbar, Form } from 'react-bootstrap/';
import React from "react"


export default function MovieNav({popular,topRated,upcoming, search, handleName, value, genresSearch, arrGenres}){

    return(
        <>
            <Navbar bg="" variant="dark" className="d-flex justify-content-around align-items-center bg-color">
                <Container>
                    <Navbar.Brand href="">Películas</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="" onClick={popular}>Populares</Nav.Link>
                            <Nav.Link href="" onClick={topRated}>Más valoradas</Nav.Link>
                            <Nav.Link href="" onClick={upcoming}>Proximamente</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Buscar una película..."
                                className="me-2"
                                aria-label="Search"
                                value={value}
                                onChange={handleName}
                                />
                            <Button variant="outline-success" onClick={search}>Buscar</Button>
                        </Form>
                    </Container>
            </Navbar>
        </>
    )
}