import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovieResponse, IMovieList} from "../../interfaces/moviesInterfaces";
import {ApiServices} from "../../services/ApiServices";
import {AxiosError} from "axios";


const initialState:IMovieResponse<IMovieList[]> = {
    page: null,
    results: [],
    total_pages: null,
    total_results: null
}
const getMovies = createAsyncThunk<IMovieResponse<IMovieList[]>, void>(
    'movieSlice/getMovies',
    async (_,{rejectWithValue}) =>{
        try {
            const {data} = await ApiServices.AxiosGetMovies()
            console.log(data)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const movieSlice = createSlice({
    name: 'movieSlice',
    initialState:initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(getMovies.fulfilled, (state, action)=>{
            state.results = action.payload.results
        })
})
const {reducer: movieReducer, actions} = movieSlice
const movieActions = {
    ...actions, getMovies
}
export {movieReducer, movieActions}