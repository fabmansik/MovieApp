import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";

const store = configureStore({
    reducer:{
        movies:movieReducer
    }
})
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export type {
    RootState, AppDispatch
}
export default store