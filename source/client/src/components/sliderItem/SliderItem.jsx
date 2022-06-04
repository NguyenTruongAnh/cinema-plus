import './sliderItem.css'
import './sliderItemResponsive.css'
import { Link } from 'react-router-dom';


import { MOVIE_BACKDROP_API } from '../../assets/api/movie_api.jsx'

export default function SliderItem({ id, backdrop_path, title }) {
    return (
        <div className="slider-item">
            <Link className="link" to={"/movie/" + id}>
                <div className="slider-item__title">{title}</div>
                <div className="slider-item__wrapper">
                    <img 
                        src={MOVIE_BACKDROP_API + backdrop_path}
                        alt="Img" 
                        className="slider-item__img"
                    />
                </div>
            </Link>
        </div>
    )
}
