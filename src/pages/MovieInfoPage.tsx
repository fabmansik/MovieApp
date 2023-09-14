import {ScrollRestoration, useLocation, useParams} from 'react-router-dom';
import {StarsRatingComponent} from "../components/ListComponents/StarsRatingComponent";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ApiServices} from "../services/ApiServices";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {IGenre, IMovieList} from "../interfaces/moviesInterfaces";
import {movieActions} from "../redux/slices/movieSlice";

export const MovieInfoPage = () => {
    const movieInfoPattern = {
        en: {
            genres: 'Genres',
            popularity: 'Popularity',
            adult: 'Adult',
            release: 'Release Date',
            originalLng: 'Original Language',
            originalTitle: 'Original Title',
            description:'Description'
        },
        uk: {
            genres: 'Жанри',
            popularity: 'Популярність',
            adult: 'Для дорослих',
            release: 'Дата релізу',
            originalLng: 'Мова оригіналу',
            originalTitle: 'Оригінальна назва',
            description:'Опис'
        }
    }

    const dispatch = useAppDispatch()
    const {language} = useAppSelector(state => state.params)
    const movie = useAppSelector(state => state.movies.currentMovie)
    const params: { id?: number } = useParams()
    useEffect(() => {
        dispatch(movieActions.getMovieById({
            id: params.id,
            lng: language
        }))
    }, [params])
    let movieInfoText
    if (language === 'uk') {
        movieInfoText = movieInfoPattern.uk
    } else {
        movieInfoText = movieInfoPattern.en
    }
    return (
        <>
            <ScrollRestoration/>
            {movie !== null ? <div className='movie-info-page'>
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
                                <p className='info-title'>{movieInfoText.genres}: </p>
                                <p>{movie.genres?.map(genre => <span key={genre.id}>{genre.name} </span>)}</p>
                            </div>
                            <div className='movie-all-added-info'>
                                <p className='info-title'>{movieInfoText.popularity}: </p>
                                <p>{movie.popularity}</p>
                                <p className='info-title'>{movieInfoText.adult}: </p>
                                <p>{movie.adult?.toString() || 'No info'}</p>
                                <p className='info-title'>{movieInfoText.release}: </p>
                                <p>{movie.release_date}</p>
                            </div>
                            <div className='movie-all-original'>
                                <p className='info-title'>{movieInfoText.originalLng}: </p><p>{movie.original_language}</p>
                                <p className='info-title'>{movieInfoText.originalTitle}: </p><p>{movie.original_title}</p>
                            </div>
                        </div>
                    </div>
                    <div className='movie-all-description'>
                        <h3>{movieInfoText.description}:</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div> : <p>Loading</p>}
        </>
    )
}