import {Container, Button, Nav, Navbar, Form} from 'react-bootstrap/';
import React,{useState} from "react"


export default function MovieNav({popular,topRated,upcoming, search, handleName, value}){
    
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Películas</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home" onClick={popular}>Populares</Nav.Link>
                    <Nav.Link href="#features" onClick={topRated}>Más valoradas</Nav.Link>
                    <Nav.Link href="#pricing" onClick={upcoming}>Proximamente</Nav.Link>
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
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}