import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IMovieResponse, IMovieList, IMovieInfo, IGenre} from "../../interfaces/moviesInterfaces";
import {ApiServices} from "../../services/ApiServices";
import axios, {AxiosError} from "axios";

export interface IMovieState{
    moviePage: IMovieResponse<IMovieList[]>
    currentMovie: IMovieInfo
    isLoading: boolean
    genres: IGenre[]
}
const initialState:IMovieState = {
    moviePage:{
        page: null,
        results: [],
        total_pages: null,
        total_results: null
    },
    currentMovie: null,
    isLoading:false,
    genres: []
}
const getMovies = createAsyncThunk<IMovieResponse<IMovieList[]>, string>(
    'movieSlice/getMovies',
    async (page,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosGetMovies(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getGenres = createAsyncThunk<IGenre[], string>(
    'movieSlice/getGenres',
    async (opt,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosGetGenres(opt)
            return data.genres
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getMovieById = createAsyncThunk<IMovieInfo, { id:number, options:string }>(
    'movieSlice/getMovieById',
    async (opt,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosSearchById(opt.id,opt.options)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(getMovies.fulfilled, (state, action)=>{
            state.moviePage = action.payload
        })
        .addCase(getMovieById.pending,(state)=>{
            state.currentMovie = null
        })
        .addCase(getMovieById.fulfilled,(state, action)=>{
            state.currentMovie = action.payload
            console.log(action.payload)
        })
        .addCase(getGenres.fulfilled, (state, action)=>{
            state.genres = action.payload
        })

})
const {reducer: movieReducer, actions} = movieSlice
const movieActions = {
    ...actions, getMovies, getMovieById, getGenres
}
export {movieReducer, movieActions}