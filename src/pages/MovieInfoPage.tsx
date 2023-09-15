import {ScrollRestoration, useLocation, useParams} from 'react-router-dom';
import {StarsRatingComponent} from "../components/ListComponents/StarsRatingComponent";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ApiServices} from "../services/ApiServices";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {IGenre, IMovieList} from "../interfaces/moviesInterfaces";
import {movieActions} from "../redux/slices/movieSlice";
import ActorsComponent from "../components/InfoComponents/ActorsComponent";
import SimilarMovieComponent from "../components/InfoComponents/SimilarMovieComponent";
import {GenreBadgeComponent} from "../components";
export const MovieInfoPage = () => {
    const movieInfoPattern = {
        en: {
            genres: 'Genres',
            popularity: 'Popularity',
            adult: 'Adult',
            release: 'Release Date',
            originalLng: 'Original Language',
            originalTitle: 'Original Title',
            description:'Description',
            actors:'Actors',
            runtime: {
                words:'Runtime',
                metrics:'min'
            },
            trailer:'Trailer',
            similar:'Similar movies'
        },
        uk: {
            genres: 'Жанри',
            popularity: 'Популярність',
            adult: 'Для дорослих',
            release: 'Дата релізу',
            originalLng: 'Мова оригіналу',
            originalTitle: 'Оригінальна назва',
            description:'Опис',
            actors:'Актори',
            runtime: {
                words:'Тривалість',
                metrics:'хв'
            },
            trailer:'Трейлер',
            similar:'Схожі фільми'
        }
    }
    const dispatch = useAppDispatch()

    const {currentMovie, videos, credits, similar} = useAppSelector(state => state.movies)
    const {lng} = useAppSelector(state => state.params)
    const params:{id?:number} = useParams()
    console.log(params)
    let keyYT
    if(videos.length !== 0){
        const {key} = videos.find(element => element.type === 'Trailer' || element.type === 'Teaser')
        keyYT = key
    }
    const genresRedux = useAppSelector(state => state.movies.genres)

    useEffect(()=>{
        dispatch(movieActions.getSimilar({id:params.id, lng:lng }))
        dispatch(movieActions.getMovieById({id:params.id, options:lng}))
        dispatch(movieActions.getVideos({id:params.id, options:lng }))
        dispatch(movieActions.getCredits({id:params.id, lng:lng }))
        dispatch(movieActions.getGenres(lng))
    },[params])
    console.log(genresRedux)
    let movieInfoText
    if (lng === 'uk') {
        movieInfoText = movieInfoPattern.uk
    } else {
        movieInfoText = movieInfoPattern.en
    }

return(
    <>
        <ScrollRestoration/>
        {currentMovie !== null ? <div className='movie-info-page'>
            <div className='movie-all'>
                <div className='movie-all-title'>
                    <h1>{currentMovie.title}</h1>
                </div>
                <div className='movie-all-info'>
                    <div className='movie-all-poster'>
                        <img src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`} alt={'poster-img'}/>
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
                            <GenreBadgeComponent badge={genre.name} key={genre.id}/>
                            )}</p>
                        </div>
                        <div className='movie-all-added-info'>
                            <p className='info-title'>{movieInfoText.popularity}: </p>
                            <p>{currentMovie.popularity}</p>
                            <p className='info-title'>{movieInfoText.adult}: </p>
                            <p>{currentMovie.adult?.toString() || 'No info'}</p>
                            <p className='info-title'>{movieInfoText.release}: </p>
                            <p>{currentMovie.release_date}</p>
                        </div>
                        <div className='movie-all-original'>
                            <p className='info-title'>{movieInfoText.originalLng}: </p><p>{currentMovie.original_language}</p>
                            <p className='info-title'>{movieInfoText.originalTitle}: </p><p>{currentMovie.original_title}</p>
                        </div>
                        <div className={'movie-all-runtime'}>
                            <p className={'info-runtime'}>{movieInfoText.runtime.words}:</p><p>{currentMovie.runtime}{movieInfoText.runtime.metrics}</p>
                        </div>
                        <div className={'movie-all-cast'}>
                            <p className={`movie-all-actors`}>{movieInfoText.actors}:</p>
                            {credits.cast.map(person=><ActorsComponent person={person} key={person.id}/>)}
                        </div>
                    </div>
                </div>
                <div className='movie-all-description'>
                    <h3>{movieInfoText.description}:</h3>
                    <p>{currentMovie.overview}</p>
                </div>
                <div className={'movie-all-trailer-div'}>
                    <h3>{movieInfoText.trailer}:</h3>
                    <div className={'movie-all-trailer'}>
                        {keyYT !== null?
                            <iframe src={`https://www.youtube.com/embed/${keyYT}`}>

                            </iframe>:''
                        }
                    </div>
                </div>
                <div className={'movie-all-similar'}>
                    <h3>{movieInfoText.similar}</h3>
                    <div className={`similar-list`}>
                        {similar.slice(0,10).map(movie=><SimilarMovieComponent movie={movie}/>)}
                    </div>
                </div>

            </div>
        </div> : <p>Loading</p>}
    </>
)
}
// <video  width="320" height="240" controls>
//     {/*<source src={`https://youtu.be/${keyYT}`} type={'video/mp4'}/>*/}
//     <source src={`https://www.youtube.com/watch?v=${keyYT}`} type={'video/mp4'}/>
// </video>:''