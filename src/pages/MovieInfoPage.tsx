import {Link, ScrollRestoration, useLocation, useParams} from 'react-router-dom';
import {StarsRatingComponent} from "../components/ListComponents/StarsRatingComponent";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ApiServices} from "../services/ApiServices";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {ICrew, IGenre, IMovieList} from "../interfaces/moviesInterfaces";
import {movieActions} from "../redux/slices/movieSlice";
import ActorsComponent from "../components/InfoComponents/ActorsComponent";
import SimilarMovieComponent from "../components/InfoComponents/SimilarMovieComponent";
import {GenreBadgeComponent} from "../components";
import CrewComponent from "../components/InfoComponents/CrewComponent";

export const MovieInfoPage = () => {
    const movieInfoPattern = {
        en: {
            genres: 'Genres',
            popularity: 'Popularity',
            adult: {
                name: 'Adult',
                yes: 'Yes',
                no: 'No'
            },
            release: 'Release Date',
            originalLng: 'Original Language',
            originalTitle: 'Original Title',
            description: 'Description',
            actors: {
                names: 'Actors',
                others: 'and others...'
            },
            runtime: {
                words: 'Runtime',
                metrics: 'min'
            },
            trailer: 'Trailer',
            similar: 'Similar movies',
            producers: 'Producers'
        },
        uk: {
            genres: 'Жанри',
            popularity: 'Популярність',
            adult: {
                name: 'Для дорослих',
                yes: 'Так',
                no: 'Ні'
            },
            release: 'Дата релізу',
            originalLng: 'Мова оригіналу',
            originalTitle: 'Оригінальна назва',
            description: 'Опис',
            actors: {
                names: 'Актори',
                others: 'та інші...'
            },
            runtime: {
                words: 'Тривалість',
                metrics: 'хв'
            },
            trailer: 'Трейлер',
            similar: 'Схожі фільми',
            producers: 'Продюсери'
        }
    }
    const dispatch = useAppDispatch()

    const {currentMovie, videos, credits, similar} = useAppSelector(state => state.movies)
    const {lng} = useAppSelector(state => state.params)
    const params: { id?: number } = useParams()
    console.log(params)
    let keyYT
    if (videos.length !== 0) {
        const video = videos.find(element => element.type === 'Trailer' || element.type === 'Teaser')
        video?.key ? keyYT = video.key : keyYT = null
    }
    const genresRedux = useAppSelector(state => state.movies.genres)

    useEffect(() => {
        dispatch(movieActions.getSimilar({id: params.id, lng: lng}))
        dispatch(movieActions.getMovieById({id: params.id, options: lng}))
        dispatch(movieActions.getVideos({id: params.id, options: lng}))
        dispatch(movieActions.getCredits({id: params.id, lng: lng}))
        dispatch(movieActions.getGenres(lng))
    }, [params])
    console.log(genresRedux)
    let movieInfoText
    if (lng === 'uk') {
        movieInfoText = movieInfoPattern.uk
    } else {
        movieInfoText = movieInfoPattern.en
    }
    let i = 0
    let producers: ICrew[] = credits.crew.filter(person => person.job === 'Executive Producer' || 'Producer')
    producers = producers.map(producer => {
        return {...producer, order: i++}
    })
    console.log(producers)
    return (
        <>
            <ScrollRestoration/>
            {currentMovie !== null ? <div className='movie-info-page'>
                <div className='movie-all'>
                    <div className='movie-all-title'>
                        <h1>{currentMovie.title}</h1>
                    </div>
                    <div className='movie-all-info'>
                        <div className='movie-all-poster'>
                            <img src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
                                 alt={'poster-img'}/>
                        </div>
                        <div className='movie-all-details'>
                            <div className='movie-all-ratings'>
                                <p>{currentMovie.vote_average?.toFixed(2)}</p>
                                <div className='movie-info-rating'>
                                    <StarsRatingComponent size={'large'} vote_average={currentMovie.vote_average}/>
                                </div>
                            </div>
                            <div className='movie-all-genres'>
                                <p className='info-title'>{movieInfoText.genres}: </p>
                                <p>{currentMovie.genres?.map(genre =>
                                        <GenreBadgeComponent badge={genre} key={genre.id}/>
                                )}</p>
                            </div>
                            <div className='movie-all-added-info'>
                                <p className='info-title'>{movieInfoText.popularity}: </p>
                                <p>{currentMovie.popularity}</p>
                                <p className='info-title'>{movieInfoText.adult.name}: </p>
                                <p>{currentMovie.adult ? movieInfoText.adult.yes : movieInfoText.adult.no}</p>
                                <p className='info-title'>{movieInfoText.release}: </p>
                                <p>{currentMovie.release_date.toString().replaceAll('-', '.')}</p>
                            </div>
                            <div className={'movie-all-producers'}>
                                <p className={'info-producers'}>{movieInfoText.producers}:</p>
                                {producers.slice(0, 10).map(producer =>
                                    <CrewComponent person={producer} length={producers.length}/>
                                )}
                                {producers.length > 10 ? movieInfoText.actors.others : ''}
                            </div>
                            <div className='movie-all-original'>
                                <p className='info-title'>{movieInfoText.originalLng}: </p>
                                <p>{currentMovie.original_language}</p>
                                <p className='info-title'>{movieInfoText.originalTitle}: </p>
                                <p>{currentMovie.original_title}</p>
                            </div>
                            <div className={'movie-all-runtime'}>
                                <p className={'info-runtime'}>{movieInfoText.runtime.words}:</p>
                                <p>{currentMovie.runtime}{movieInfoText.runtime.metrics}</p>
                            </div>
                            <div className={'movie-all-cast'}>
                                <p className={`movie-all-actors`}>{movieInfoText.actors.names}:</p>

                                {credits.cast.slice(0, 20).map(person =>
                                    <ActorsComponent person={person} key={person.id} length={credits.cast.length}/>
                                )}

                                {credits.cast.length > 20 ? movieInfoText.actors.others : ''}
                            </div>
                        </div>
                    </div>
                    {currentMovie.overview&&
                        <div className='movie-all-description'>
                        <h3>{movieInfoText.description}:</h3>
                        <p>{currentMovie.overview}</p>
                    </div>}
                    {keyYT &&
                        <div className={'movie-all-trailer-div'}>
                            <h3>{movieInfoText.trailer}:</h3>
                            <div className={'movie-all-trailer'}>
                                <iframe src={`https://www.youtube.com/embed/${keyYT}`}
                                        onError={() => console.log('chinazes')}>
                                </iframe>
                                :''
                            </div>
                        </div>}
                    {similar.length!==0 &&
                        <div className={'movie-all-similar'}>
                            <h3>{movieInfoText.similar}</h3>
                            <div className={`similar-list`}>
                                {similar.slice(0, 10).map(movie => <SimilarMovieComponent movie={movie}/>)}
                            </div>
                        </div>}

                </div>
            </div> : ''}
        </>
    )
}
// <video  width="320" height="240" controls>
//     {/*<source src={`https://youtu.be/${keyYT}`} type={'video/mp4'}/>*/}
//     <source src={`https://www.youtube.com/watch?v=${keyYT}`} type={'video/mp4'}/>
// </video>:''