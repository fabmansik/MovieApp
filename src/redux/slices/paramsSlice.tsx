import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios/index";
import {useMediaPredicate} from "react-media-hook";
export interface IState{
    theme:string
    lng: string
    smallerThan750: boolean
    smallerThan1000: boolean
    between: boolean
}
const initialState:IState ={
    theme: null,
    lng: null,
    smallerThan750: null,
    smallerThan1000: null,
    between: null
}

const paramsSlice = createSlice({
    name: 'paramsSlice',
    initialState,
    reducers:{
        getTheme: (state) => {
            const theme = localStorage.getItem('theme')
            theme? state.theme= theme : localStorage.setItem('theme',`${theme}`)
        },
        changeTheme: (state) => {
            if (state.theme==='light'){
                state.theme = 'dark'
                localStorage.setItem('theme','dark')
            } else {
                state.theme = 'light'
                localStorage.setItem('theme','light')
            }
        },
        getSm750: (state) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            state.smallerThan750 = useMediaPredicate("(max-width: 750px)")
        },
        getSm1000: (state) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            state.smallerThan1000 = useMediaPredicate("(max-width: 1000px)")
        },
        getBtw: (state) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            state.between = useMediaPredicate('(max-width: 1000px) and (min-width: 751px)')
        }
    },
    extraReducers:builder => builder
})
const {reducer: paramsReducer, actions} = paramsSlice
const paramsActions = {
    ...actions
}
export {paramsReducer, paramsActions}