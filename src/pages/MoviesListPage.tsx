import {ApiServices} from "../services/ApiServices";
import React, {createContext, useEffect, useState} from "react";
import {MoviesListCardComponent} from "../components/ListComponents/MoviesListCardComponent";
import {Link, ScrollRestoration, useParams, useSearchParams} from "react-router-dom";
import {IMovieList, IMovieResponse} from "../interfaces/moviesInterfaces";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import {genreActions} from "../redux/slices/genreSlice";
import PaginationComponent from "../components/ListComponents/PaginationComponent";

export const MoviesListPage = () => {

    const movies = useAppSelector(state => state.movies.moviePage)
    const dispatch = useAppDispatch()
    const [querry, setQuerry] = useSearchParams()
    const searchParams = {
        include_adult: 'false',
        include_video: 'false',
        language: 'en-US',
        page: '1',
        sort_by: 'popularity.desc'
    }
    console.log(querry.toString())
    useEffect(() => {
        dispatch(movieActions.getMovies(querry.toString()))
        // ApiServices.AxiosGetMoviesExactPage(setMoviesList, setGetInfo, page.page))
        dispatch(genreActions.getGenres())
    }, [querry.toString()])
    return (
        <>
            <ScrollRestoration/>
            <div className='movie-list'>
                {
                    movies.results !== null ?
                        movies.results.map(movie => <MoviesListCardComponent key={movie.id} movie={movie}/>) :
                        <p>Loading...</p>}
            </div>
            <div className='page-info'>
                <PaginationComponent/>
            </div>

        </>


    )
}