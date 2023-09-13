import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";
import {genreReducer} from "./slices/genreSlice";
import {paramsReducer} from "./slices/paramsSlice";

const store = configureStore({
    reducer:{
        movies:movieReducer,
        genres:genreReducer,
        params:paramsReducer
    }
})
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export type {
    RootState, AppDispatch
}
export default store