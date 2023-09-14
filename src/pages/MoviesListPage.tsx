import {ApiServices} from "../services/ApiServices";
import React, {createContext, useEffect, useState} from "react";
import {MoviesListCardComponent} from "../components/ListComponents/MoviesListCardComponent";
import {ScrollRestoration, useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import PaginationComponent from "../components/ListComponents/PaginationComponent";
import {paramsActions} from "../redux/slices/paramsSlice";
import qs from "qs";

export const MoviesListPage = () => {

    const movies = useAppSelector(state => state.movies.moviePage)
    const {querryParams} = useAppSelector(state => state.params)
    const [querry, setQuerry] = useSearchParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getMovies(querry.toString()))
        dispatch(movieActions.getGenres(querry.toString()))
    }, [querry])
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