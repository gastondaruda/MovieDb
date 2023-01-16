import React,{useState, useEffect} from "react"
import Carousel from 'react-bootstrap/Carousel';

const API_img="https://image.tmdb.org/t/p/original";

function CarouselComponent() {

    const [imageCarousel, setImageCarousel] = useState([])
    /*
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=c9b77bcacc73e615cac9ff002be7f83a&language=en-US&page=1")
        .then(response =>response.json())
        .then(data=>{console.log(data)})
        .then(data =>{setImageCarousel(data)})
    }, [])
    */


    return (
        <Carousel>
            {
                imageCarousel.map((movieResult) => 
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={`${API_img+movieResult.backdrop_path}`}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            }
        </Carousel>
    );
    }

export default CarouselComponent;


/*

<Carousel.Item>
            
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
            />

            <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            </Carousel.Caption>
        </Carousel.Item>
*/