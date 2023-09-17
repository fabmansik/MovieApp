import {IMovieInfo, IMovieList} from "../../interfaces/moviesInterfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiServices} from "../../services/ApiServices";
import {AxiosError} from "axios";

export interface IFavourite{
    favourite: number[]
    results: IMovieList[]
}
const initialState:IFavourite = {
    favourite:[],
    results:[]
}
const getDetails = createAsyncThunk<IMovieInfo, { id:number, options:string }>(
    'favouriteSlice/getDetails',
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
const favouriteSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers:{
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
                state.results = state.results.filter(element => element.id !== action.payload)
            }else{
                localStorage.setItem('favourite',JSON.stringify([...state.favourite, action.payload]))
                state.favourite = [...state.favourite, action.payload]
            }
        }
    },
    extraReducers:builder => builder
        .addCase(getDetails.fulfilled,(state, {payload})=>{
            const genres_ids:number[] = []
            payload.genres.map(element=> genres_ids.push(element.id))
            console.log(payload.genres)
            const movie :IMovieList = {
                adult: payload.adult,
                backdrop_path: payload.backdrop_path,
                genre_ids: genres_ids,
                id: payload.id,
                original_language: payload.original_language,
                original_title: payload.original_title,
                overview: payload.overview,
                popularity: payload.popularity,
                poster_path: payload.poster_path,
                release_date: payload.release_date,
                title: payload.title,
                video: payload.video,
                vote_average: payload.vote_average,
                vote_count: payload.vote_count
            }
            state.results.find(element => element.id===movie.id)?
                state.results = [...state.results]:
            state.results = [...state.results, movie]
        })

})
const {reducer: favouriteReducer, actions} = favouriteSlice
const favouriteActions = {
    ...actions, getDetails
}
export {favouriteReducer, favouriteActions}