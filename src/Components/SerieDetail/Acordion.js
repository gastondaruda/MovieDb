import {Accordion, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./serieDetail.css"

export default function Acordion({tv_season, air_date, episode_count, overview,poster_path, season_id,tv_id, season_number}){

    const API_img="https://image.tmdb.org/t/p/w500/";


    return(
        <Accordion className="w-100 accordionContainer bg-color" id={season_id}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{tv_season} - Episodes: {episode_count}</Accordion.Header>
                <Accordion.Body className="text-white">
                    <div className='accordion_body d-flex align-items-center justify-content-around'>
                        <div className='d-flex flex-column align-items-center'>
                            <img className='accordion_image rounded' src={API_img+poster_path} alt={tv_season}/>
                            <span className="color-warning">{air_date}</span>
                        </div>
                        <div>
                            <p className='text-white'>{overview}</p>
                            <Link to={`/TvDetails/${tv_id}/${season_number}`}>
                                <Button>Ver temporada</Button>
                            </Link>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}