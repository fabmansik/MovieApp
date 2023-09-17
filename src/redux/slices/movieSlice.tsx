import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    IMovieResponse,
    IMovieList,
    IMovieInfo,
    IGenre,
    IVideo,
    ICredits,
    ICast, ICrew
} from "../../interfaces/moviesInterfaces";
import {ApiServices} from "../../services/ApiServices";
import {AxiosError} from "axios";

export interface IMovieState{
    moviePage: IMovieResponse<IMovieList[]>
    currentMovie: IMovieInfo
    genres: IGenre[]
    videos: IVideo[]
    credits: ICredits
    similar: IMovieList[]
    actor: ICast
    producer: ICrew
    searchPage: IMovieResponse<IMovieList[]>
    favourite: number[]
}
const initialState:IMovieState = {
    moviePage:{
        page: null,
        results: [],
        total_pages: null,
        total_results: null
    },
    currentMovie: null,
    genres: [],
    videos:[],
    credits:{
        id:null,
        cast:[],
        crew:[]
    },
    similar:[],
    actor: null,
    producer: null,
    searchPage:{
        page: null,
        results: [],
        total_pages: null,
        total_results: null
    },
    favourite:[]
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
const getVideos = createAsyncThunk<IVideo[], { id:number, options:string }>(
    'movieSlice/getVideos',
    async (opt, {rejectWithValue})=>{
        try {
            let {data} = await ApiServices.AxiosVideos(opt.id, opt.options)
            if(data.results.length===0){
                let {data} = await ApiServices.AxiosVideos(opt.id, 'en-US')
                return data.results
            }
            return data.results
        } catch (e){
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getCredits = createAsyncThunk<ICredits, {id:number, lng:string}>(
    'movieSlice/getCredits',
    async (opt,{rejectWithValue})=>{
        try {
            const {data} = await ApiServices.AxiosCredits(opt.id, opt.lng)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getSimilar = createAsyncThunk<IMovieList[],{id:number, lng:string}>(
    'movieSlice/getSimilar',
    async (opt, {rejectWithValue})=>{
        try {
            const {data} = await ApiServices.AxiosSimilar(opt.id, opt.lng)
            return data.results
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getWithCrew = createAsyncThunk<IMovieResponse<IMovieList[]>, string>(
    'movieSlice/getWithCrew',
    async (opt,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosGetMovies(opt)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const searchMovies = createAsyncThunk<IMovieResponse<IMovieList[]>, string>(
    'movieSlice/searchMovies',
    async (page,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosSearchMovie(page)
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
    reducers:{
        withActor: (state, action)=>{
            state.actor = action.payload
        },
        withProducer: (state, action) =>{
            state.producer = action.payload
        },
        clearSearchPage: (state)=>{
            state.searchPage = initialState.searchPage
        },
        getFavourite: (state)=>{
            const fav = localStorage.getItem('favourite')
            if(fav){
                state.favourite=JSON.parse(fav)
            } else {
                localStorage.setItem('favourite','')
            }
        },
        addFavourite: (state, action) => {
            const alreadyIN = state.favourite.find(element=>element===action.payload)
            if(alreadyIN){
                const newState = state.favourite.filter(element=>element!==alreadyIN)
                localStorage.setItem('favourite',JSON.stringify(newState))
                state.favourite = newState
            }else{
                localStorage.setItem('favourite',JSON.stringify([...state.favourite, action.payload]))
                state.favourite = [...state.favourite, action.payload]
            }
        }
    },
    extraReducers: builder => builder
        .addCase(getMovies.fulfilled, (state, action)=>{
            state.moviePage = action.payload
            state.currentMovie = null
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
        .addCase(getVideos.fulfilled, (state, action)=>{
            state.videos = action.payload
        })
        .addCase(getCredits.fulfilled, (state, action)=>{
            state.credits = action.payload
        })
        .addCase(getSimilar.fulfilled, (state, action)=>{
            state.similar = action.payload
        })
        .addCase(searchMovies.fulfilled, (state, action)=>{
            state.searchPage = action.payload
            state.currentMovie = null
        })

})
const {reducer: movieReducer, actions} = movieSlice
const movieActions = {
    ...actions, getMovies, getMovieById, getGenres, getVideos, getCredits, getSimilar, getWithCrew, searchMovies
}
export {movieReducer, movieActions}