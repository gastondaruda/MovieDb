import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function TvNavbar({popular, today, topRated}){
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Series</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home" onClick={popular}>Series populares</Nav.Link>
                    <Nav.Link href="#features" onClick={today}>Series en transmisión</Nav.Link>
                    <Nav.Link href="#pricing" onClick={topRated}>Mas vistas</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}