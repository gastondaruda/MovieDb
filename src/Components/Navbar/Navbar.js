import React from "react"
import {Container, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavbarComponent() {
    return (
        <>
        {['xl'].map((expand) => (
            <Navbar collapseOnSelect key={expand} bg="" expand={expand} className="pb-2 bg-color">
                <Container fluid>
                    <Navbar.Brand href="" className="text-white font-weight-bold">React js - Cuevana</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                    
                    >
                    <Offcanvas.Header closeButton className="bg-color">
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="text-warning font-weight-bold">
                        Gastón Da Ruda - FrontEnd Developer Jr.
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="bg-color">
                        <Nav className="justify-content-end flex-grow-1 pe-3 text-uppercase ">
                            <Nav.Link href="#/">
                                <NavLink to="/MovieDb" className="text-white">Películas</NavLink>
                            </Nav.Link>
                            <Nav.Link href="#/">
                                <NavLink to="/TvSeries" className="text-white">Series</NavLink>
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        ))}
        </>
    );
}

export default NavbarComponent;