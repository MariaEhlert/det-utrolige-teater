import Moment from 'moment';
import { Link } from 'react-router-dom';
export const EventItem = props => {
    //Moment er en npm pakke
    // gør at datoen kommer ud som dag, månede og år
    const startDate = Moment(props.data.startdate).format('DD-MM-YYYY')
    const stopDate = Moment(props.data.stopdate).format('DD-MM-YYYY')
    return (
        <article className='eventsWrapper'>
            <figure>
                <div className='imageWrapper'>
                    <img src={props.data.image} alt={props.data.title} />
                </div>
                <figcaption>
                    <div className='placeWrapper'>
                        <p>{props.data.stage_name}</p>
                        <h6>{startDate} - {stopDate}</h6>
                        <hr />
                    </div>
                    <div className='infoWrapper'>
                        <h2>{props.data.title}</h2>
                        <h3>{props.data.genre}</h3>
                    </div>
                    <div className='btnWrapper'>
                        <Link to={''}><button className='readMore'>LÆS MERE</button></Link>
                        <Link to={''}><button className='buyTicket'>KØB BILLET</button></Link>
                    </div>
                </figcaption>
            </figure>
        </article>
    )
}