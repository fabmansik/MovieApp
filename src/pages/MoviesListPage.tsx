import {ApiServices} from "../services/ApiServices";
import React, {createContext, useEffect, useState} from "react";
import {MoviesListCardComponent} from "../components/ListComponents/MoviesListCardComponent";
import {Link, ScrollRestoration, useParams, useSearchParams} from "react-router-dom";
import {IMovieList, IMovieResponse} from "../interfaces/moviesInterfaces";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import PaginationComponent from "../components/ListComponents/PaginationComponent";

export const MoviesListPage = () => {

    const movies = useAppSelector(state => state.movies.moviePage)
    const {lng} = useAppSelector(state => state.params)
    const dispatch = useAppDispatch()
    const [querry, setQuerry] = useSearchParams()

    useEffect(() => {
        dispatch(movieActions.getMovies(querry.toString()))
        // ApiServices.AxiosGetMoviesExactPage(setMoviesList, setGetInfo, page.page))
        dispatch(movieActions.getGenres(lng))
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