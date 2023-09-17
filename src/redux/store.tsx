import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";
import {paramsReducer} from "./slices/paramsSlice";
import {favouriteReducer} from "./slices/favouriteSlice";

const store = configureStore({
    reducer:{
        movies:movieReducer,
        params:paramsReducer,
        favourites:favouriteReducer
    }
})
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export type {
    RootState, AppDispatch
}
export default store