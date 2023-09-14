import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";
import {paramsReducer} from "./slices/paramsSlice";

const store = configureStore({
    reducer:{
        movies:movieReducer,
        params:paramsReducer
    }
})
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export type {
    RootState, AppDispatch
}
export default store