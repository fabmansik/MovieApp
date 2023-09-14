import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IMovieResponse, IMovieList, IMovieInfo, IGenre} from "../../interfaces/moviesInterfaces";
import {ApiServices} from "../../services/ApiServices";
import axios, {AxiosError} from "axios";
import qs from "qs";

export interface IMovieState{
    moviePage: IMovieResponse<IMovieList[]>
    currentMovie: IMovieInfo
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
    genres: []
}
const getMovies = createAsyncThunk<IMovieResponse<IMovieList[]>, string>(
    'movieSlice/getMovies',
    async (page,{rejectWithValue}) =>{
        try {
            const parsed = qs.parse(page)
            if(parsed.language===''){

            }
            else
            {const {data} = await ApiServices.AxiosGetMovies(page)
                return data
            }

        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getGenres = createAsyncThunk<IGenre[], string>(
    'movieSlice/getGenres',
    async (lng,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosGetGenres(lng)
            return data.genres
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getMovieById = createAsyncThunk<IMovieInfo, {id:number, lng: string }>(
    'movieSlice/getMovieById',
    async (props,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosSearchById(props.id, props.lng)
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
            if (action.payload){
                state.moviePage = action.payload
            }
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