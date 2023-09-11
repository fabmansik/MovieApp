import {ApiServices} from "../services/ApiServices";
import React, {createContext, useEffect, useState} from "react";
import {MoviesListCardComponent} from "./MoviesListCardComponent";
import {Link, ScrollRestoration, useParams} from "react-router-dom";
import {IMovieList, IMovieResponse} from "../interfaces/moviesInterfaces";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
export const GenresContext = createContext([])
export const PageContext = createContext(null)
export const MoviesListComponent = () => {

    const [moviesList, setMoviesList] = useState<IMovieList[]>(null)
    const [getInfo, setGetInfo] = useState<IMovieResponse<IMovieList[]>>(null)
    const [genres, setGenres] = useState([])
    let page = useParams()
    const info = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        (((Object.keys(page).length === 0 && Object.keys(page).length <= 1) || page.page === '0' ) ?
            dispatch(movieActions.getMovies()):
            ApiServices.AxiosGetMoviesExactPage(setMoviesList, setGetInfo, page.page))
        ApiServices.AxiosGetGenres(setGenres)
        setGetInfo(info)
        }, [page])

    return(
        <PageContext.Provider value={useAppSelector(state => state.movies.page)}>
            <ScrollRestoration />
            <GenresContext.Provider value={genres}>
                <div className='movie-list'>
                    {
                        moviesList !== null?
                        moviesList.map(movie=><MoviesListCardComponent key={movie.id} movie={movie}/>):
                        <p>Loading...</p>}
                </div>
                <div className='page-info'>
                    {/*<div className='page-selector'>*/}
                    {/*    <Link to={`/${getInfo.page-1}`}*/}
                    {/*          style={getInfo.page === 1? {pointerEvents:"none", fontWeight:'normal'}:{} }*/}
                    {/*          className='link-button'> Previous*/}
                    {/*    </Link>*/}
                    {/*    <div className='page-input'>{getInfo.page} ... 500</div>*/}
                    {/*    <Link to={`/${getInfo.page+1}`}*/}
                    {/*          style={getInfo.page === 500? {pointerEvents:"none", fontWeight:'normal'}:{} }*/}
                    {/*          className='link-button'> Next*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </div>
            </GenresContext.Provider>
        </PageContext.Provider>
    )
}