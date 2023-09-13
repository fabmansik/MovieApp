import axios, {AxiosPromise, AxiosResponse} from "axios";
import React from "react";
import {IGenre, IMovieInfo, IMovieList, IMovieResponse} from "../interfaces/moviesInterfaces";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmJmYTJmNTM3ODE2MGFiYzgyZmZjOTFmNGE3NmMzNyIsInN1YiI6IjY0YzBjMGUzMTNhMzIwMDBmZmJlOTM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k4ETxPln5NDQw-GcIRzba3N_fwgLRxTEUu22k6S_88Y'
    }
}
type IRes<DATA> = Promise<AxiosResponse<DATA>>
export const ApiServices = {
    AxiosGetMovies : (page:string) : IRes<IMovieResponse<IMovieList[]>> =>{
        return axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&${page}&sort_by=popularity.desc`,options)
    },
    //@ts-ignore
    AxiosGetMoviesExactPage : (setMoviesList, setGetInfo, page)=>{
        axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}`,options).then(res=>{setMoviesList(res.data.results); setGetInfo(res.data)})
    },

    AxiosGetGenres: () : IRes<{genres:IGenre[]}>=>{
        return axios.get('https://api.themoviedb.org/3/genre/movie/list', options)
    },
    //@ts-ignore
    AxiosSearchMovie: (search, setMovies) =>{
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}`,options).then(res=>setMovies(res.data.results))
    },

    AxiosSearchById: (id:number) : IRes<IMovieInfo>=>{
        return axios.get(`https://api.themoviedb.org/3/movie/${id}`, options)
    }

}