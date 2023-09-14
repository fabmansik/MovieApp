import {createSlice} from "@reduxjs/toolkit";
import {useMediaPredicate} from "react-media-hook";
import {IQuerry} from "../../interfaces/moviesInterfaces";
import qs from "qs";
export interface IState{
    querryParams:IQuerry
    smallerThan750: boolean
    smallerThan1000: boolean
    between: boolean
}
const initialState:IState ={
    querryParams:{
        theme: null,
        with_genres:null,
        language:null,
        page:1
    },
    smallerThan750: null,
    smallerThan1000: null,
    between: null
}

const paramsSlice = createSlice({
    name: 'paramsSlice',
    initialState,
    reducers:{

        setTheme: (state) => {
            if (state.querryParams.theme==='light'){
                state.querryParams.theme = 'dark'
                localStorage.setItem('theme','dark')
            } else {
                state.querryParams.theme = 'light'
                localStorage.setItem('theme','light')
            }
        },

        setLng:(state, action)=>{
            state.querryParams.language = action.payload
        },
        setPage:(state, action)=>{
            state.querryParams.page = action.payload
        },
        getDefaults: (state) =>{
            const lng = localStorage.getItem('lng')
            if(lng!== null){
                state.querryParams.language = lng
                console.log(lng)
            } else {
                state.querryParams.language = 'en-US'
                localStorage.setItem('lng','en-US')
            }
            const theme = localStorage.getItem('theme')
            theme? state.querryParams.theme = theme : localStorage.setItem('theme',`${theme}`)

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