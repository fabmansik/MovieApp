import {ScrollRestoration, useLocation, useParams} from 'react-router-dom';
import {StarsRatingComponent} from "./StarsRatingComponent";
import React, {useEffect, useState} from "react";
import {ApiServices} from "../services/ApiServices";
export const MovieInfoPageComponent = () => {
    const location = useLocation();
    const {genres} = location.state;
    const [movie, setMovie] = useState([])
    const {adult,  genre_ids, original_language, original_title,
        overview, popularity, poster_path, release_date, title, vote_average} = movie
    let movieGenres = []
    const params = useParams()

    useEffect(()=>{
        ApiServices.AxiosSearchById(params.id, setMovie
        )},[params])

    genre_ids?.map(genre_id=>
        genres.find(genre => genre.id === genre_id ? movieGenres.push(genre.name) :  0)
    )
return(
    <>
        <ScrollRestoration />
    <div className='movie-info-page'>
        <div className='movie-all'>
            <div className='movie-all-title'>
                <h1>{title}</h1>
            </div>
            <div className='movie-all-info'>
                <div className='movie-all-poster'>
                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={'poster-img'}/>
                </div>
                <div className='movie-all-details'>
                    <div className='movie-all-ratings'>
                        <p>{vote_average?.toFixed(2)}</p>
                        <div className='movie-info-rating'>
                            <StarsRatingComponent size={'large'} vote_average={vote_average}/>
                        </div>
                    </div>
                    <div className='movie-all-genres'>
                        <p className='info-title'>Genres: </p>
                        <p>{movieGenres?.map(genre=><span key={genre}>{genre} </span>)}</p>
                    </div>
                    <div className='movie-all-added-info'>
                        <p className='info-title'>Popularity: </p>
                        <p>{popularity}</p>
                        <p className='info-title'>Adult: </p>
                        <p>{adult?.toString() || 'No info'}</p>
                        <p className='info-title'>Release date: </p>
                        <p>{release_date}</p>
                    </div>
                    <div className='movie-all-original'>
                        <p className='info-title'>Original Language: </p><p>{original_language}</p>
                        <p className='info-title'>Original Title: </p><p>{original_title}</p>
                    </div>
                </div>
            </div>
            <div className='movie-all-description'>
                <h3>Description:</h3>
                <p>{overview}</p>
            </div>
        </div>
    </div>
    </>
)
}