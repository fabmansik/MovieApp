import axios, {AxiosPromise, AxiosResponse} from "axios";
import React from "react";
import {IMovieList, IMovieResponse} from "../interfaces/moviesInterfaces";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmJmYTJmNTM3ODE2MGFiYzgyZmZjOTFmNGE3NmMzNyIsInN1YiI6IjY0YzBjMGUzMTNhMzIwMDBmZmJlOTM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k4ETxPln5NDQw-GcIRzba3N_fwgLRxTEUu22k6S_88Y'
    }
}
type IRes<DATA> = Promise<AxiosResponse<DATA>>
export const ApiServices = {
    AxiosGetMovies : () : IRes<IMovieResponse<IMovieList[]>> =>{
        return axios.get('https://api.themoviedb.org/3/discover/movie',options)
    },
    //@ts-ignore
    AxiosGetMoviesExactPage : (setMoviesList, setGetInfo, page)=>{
        axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}`,options).then(res=>{setMoviesList(res.data.results); setGetInfo(res.data)})
    },
    //@ts-ignore
    AxiosGetGenres: (setGenres) =>{
        axios.get('https://api.themoviedb.org/3/genre/movie/list', options).then(res=>{setGenres(res.data.genres)})
    },
    //@ts-ignore
    AxiosSearchMovie: (search, setMovies) =>{
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}`,options).then(res=>setMovies(res.data))
    },
    //@ts-ignore
    AxiosSearchById: (id, setIdMovie) =>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, options).then(res=>setIdMovie(res.data))
    }

}