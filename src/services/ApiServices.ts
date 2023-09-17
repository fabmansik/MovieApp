import axios, {AxiosPromise, AxiosResponse} from "axios";
import React from "react";
import {
    ICredits,
    IGenre,
    IMovieInfo,
    IMovieList,
    IMovieResponse,
    IVideo,
    IVideoRes
} from "../interfaces/moviesInterfaces";
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmJmYTJmNTM3ODE2MGFiYzgyZmZjOTFmNGE3NmMzNyIsInN1YiI6IjY0YzBjMGUzMTNhMzIwMDBmZmJlOTM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k4ETxPln5NDQw-GcIRzba3N_fwgLRxTEUu22k6S_88Y'
//     }
// }
export const baseURL = process.env.REACT_APP_API

export const apiService = axios.create({baseURL})
apiService.interceptors.request.use(request=>{
    const access = process.env.REACT_APP_TOKEN
    if (access){
        request.headers.Authorization = `Bearer ${access}`
    }
    return request
})
type IRes<DATA> = Promise<AxiosResponse<DATA>>
export const ApiServices = {
    AxiosGetMovies : (page:string) : IRes<IMovieResponse<IMovieList[]>> =>{
        return apiService.get(`/discover/movie?${page}`)
    },
    AxiosGetGenres: (lng:string) : IRes<{genres:IGenre[]}>=>{
        return apiService.get(`/genre/movie/list?language=${lng}`)
    },
    AxiosSearchMovie: (query:string) : IRes<IMovieResponse<IMovieList[]>>  =>{
        return apiService.get(`/search/movie?${query}`)
    },
    AxiosSearchPop:(search:string, setMovies:React.Dispatch<React.SetStateAction<IMovieList[]>>, query:string)  =>{
        apiService.get(`/search/movie?query=${search}&language=${query}`).then(res=>setMovies(res.data.results))
    },
    AxiosSearchById: (id:number, lng:string) : IRes<IMovieInfo>=>{
        return apiService.get(`/movie/${id}?language=${lng}`)
    },
    AxiosVideos: (id:number, lng:string) : IRes<IVideoRes>=>{
        return apiService.get(`/movie/${id}/videos?language=${lng}`)
    },
    AxiosCredits: (id:number, lng:string) : IRes<ICredits>=>{
        return apiService.get(`/movie/${id}/credits?language=${lng}`)
    },
    AxiosSimilar: (id:number, lng:string) : IRes<IMovieResponse<IMovieList[]>> =>{
        return apiService.get(`/movie/${id}/similar?language=${lng}`)
    }

}