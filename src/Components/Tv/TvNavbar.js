import {Container, Nav, Navbar, Form, Button} from 'react-bootstrap';

export function TvNavbar({popular, today, topRated, value, handleName, search}){
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Tv Shows</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="" onClick={popular}>Series populares</Nav.Link>
                    <Nav.Link href="" onClick={today}>Series en transmisión</Nav.Link>
                    <Nav.Link href="" onClick={topRated}>Mas vistas</Nav.Link>
                </Nav>
                <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Buscar una serie..."
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