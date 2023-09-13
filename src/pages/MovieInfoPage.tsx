import {ScrollRestoration, useLocation, useParams} from 'react-router-dom';
import {StarsRatingComponent} from "../components/ListComponents/StarsRatingComponent";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ApiServices} from "../services/ApiServices";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {IGenre, IMovieList} from "../interfaces/moviesInterfaces";
import {movieActions} from "../redux/slices/movieSlice";
export const MovieInfoPage = () => {

    const dispatch = useAppDispatch()

    const movie = useAppSelector(state => state.movies.currentMovie)
    const params:{id?:number} = useParams()
    console.log(params)
    console.log(movie)
    useEffect(()=>{
        dispatch(movieActions.getMovieById(params.id))
    },[params])

return(
    <>
        <ScrollRestoration />
        {movie !== null? <div className='movie-info-page'>
            <div className='movie-all'>
                <div className='movie-all-title'>
                    <h1>{movie.title}</h1>
                </div>
                <div className='movie-all-info'>
                    <div className='movie-all-poster'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={'poster-img'}/>
                    </div>
                    <div className='movie-all-details'>
                        <div className='movie-all-ratings'>
                            <p>{movie.vote_average?.toFixed(2)}</p>
                            <div className='movie-info-rating'>
                                <StarsRatingComponent size={'large'} vote_average={movie.vote_average}/>
                            </div>
                        </div>
                        <div className='movie-all-genres'>
                            <p className='info-title'>Genres: </p>
                            <p>{movie.genres?.map(genre => <span key={genre.id}>{genre.name} </span>)}</p>
                        </div>
                        <div className='movie-all-added-info'>
                            <p className='info-title'>Popularity: </p>
                            <p>{movie.popularity}</p>
                            <p className='info-title'>Adult: </p>
                            <p>{movie.adult?.toString() || 'No info'}</p>
                            <p className='info-title'>Release date: </p>
                            <p>{movie.release_date}</p>
                        </div>
                        <div className='movie-all-original'>
                            <p className='info-title'>Original Language: </p><p>{movie.original_language}</p>
                            <p className='info-title'>Original Title: </p><p>{movie.original_title}</p>
                        </div>
                    </div>
                </div>
                <div className='movie-all-description'>
                    <h3>Description:</h3>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>:<p>Loading</p>}
    </>
)
}