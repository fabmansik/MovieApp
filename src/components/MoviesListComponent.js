import {ApiServices} from "../services/ApiServices";
import React, {createContext, useEffect, useState} from "react";
import {MoviesListCardComponent} from "./MoviesListCardComponent";
import {Link, ScrollRestoration, useParams} from "react-router-dom";
export const GenresContext = createContext([])
export const PageContext = createContext()
export const MoviesListComponent = () => {

    const [moviesList, setMoviesList] = useState([])
    const [getInfo, setGetInfo] = useState([])
    const [genres, setGenres] = useState([])
    let page = useParams()

    useEffect(()=>{
        (((Object.keys(page).length === 0 && Object.keys(page).length <= 1) || page.page === '0' ) ?
            ApiServices.AxiosGetMovies(setMoviesList, setGetInfo):
            ApiServices.AxiosGetMoviesExactPage(setMoviesList, setGetInfo, page.page))
        ApiServices.AxiosGetGenres(setGenres)
        }, [page])

    return(
        <PageContext.Provider value={page.page}>
            <ScrollRestoration />
            <GenresContext.Provider value={genres}>
                <div className='movie-list'>
                    {moviesList.map(movie=><MoviesListCardComponent key={movie.id} movie={movie}/>)}
                </div>
                <div className='page-info'>
                    <div className='page-selector'>
                        <Link to={`/${getInfo.page-1}`}
                              style={getInfo.page === 1? {pointerEvents:"none", fontWeight:'normal'}:{} }
                              className='link-button'> Previous
                        </Link>
                        <div className='page-input'>{getInfo.page} ... 500</div>
                        <Link to={`/${getInfo.page+1}`}
                              style={getInfo.page === 500? {pointerEvents:"none", fontWeight:'normal'}:{} }
                              className='link-button'> Next
                        </Link>
                    </div>
                </div>
            </GenresContext.Provider>
        </PageContext.Provider>
    )
}