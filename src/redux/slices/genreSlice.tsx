import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovieResponse, IMovieList, IMovieInfo, IGenre} from "../../interfaces/moviesInterfaces";
import {ApiServices} from "../../services/ApiServices";
import {AxiosError} from "axios";

export interface IState{
    results: IGenre[]
}
const initialState:IState= {
    results:[]
}
const getGenres = createAsyncThunk<IGenre[], void>(
    'genreSlice/getGenres',
    async (_,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosGetGenres()
            return data.genres
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const movieSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(getGenres.fulfilled, (state, action)=>{
            state.results = action.payload
        })

})
const {reducer: genreReducer, actions} = movieSlice
const genreActions = {
    ...actions, getGenres
}
export {genreReducer, genreActions}