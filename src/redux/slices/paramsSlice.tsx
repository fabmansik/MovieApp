import {createSlice} from "@reduxjs/toolkit";
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
            if (theme){
                state.theme= theme
            } else{
                localStorage.setItem('theme',`light`)
                state.theme = 'light'
            }
        },
        getLng: (state)=>{
            const lng = localStorage.getItem('lng')
            if(lng!== null){
                state.lng = lng
            } else {
                state.lng = 'en-US'
                localStorage.setItem('lng','en-US')
            }
        },
        setLng:(state, action)=>{
            state.lng = action.payload
            localStorage.setItem('lng',`${action.payload}`)
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