import React from "react"
import {Card, Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2'
import "./serieDetail.css"

export default function CardSeason({episode_number ,name, still_path, backImg, videoId, epId }){

    const swalSuccessAlert = () => {
        Swal.fire({
            title: 'Oops...',
            text: 'still working',
            icon: 'warning',
            confirmButtonText: 'Cool'
        })
    }

const MyVerticallyCenteredModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-white">
                Modal heading
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide} className="text-white">Close</Button>
            </Modal.Footer>
        </Modal>
        );
    }
    


    const [modalShow, setModalShow] = React.useState(false);

    const API_img="https://image.tmdb.org/t/p/w500/";
    return(
        <>
        <Card id={epId} style={{ width: '17rem' }} className="d-flex flex-column align-items-inherit justify-content-center mb-2">
            <Card.Img variant="top" className="card_season_img"src={API_img+still_path} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-warning text-uppercase">Episode {episode_number} </Card.Title>
                {name}
                <Button variant="primary"  onClick={() => swalSuccessAlert()}>Go somewhere</Button>
            </Card.Body>
            </Card>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}