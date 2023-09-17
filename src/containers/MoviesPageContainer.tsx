import {Outlet, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import {HeaderComponent} from "../components/HeaderComponent";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {paramsActions} from "../redux/slices/paramsSlice";

export const MoviesPageContainer = () => {
    const dispatch = useAppDispatch()
    const [query, setQuery]=useSearchParams()
    const {params}= useAppSelector(state => state)
    const {theme, lng} = params
    useEffect(()=>{
        if(query){
            dispatch(paramsActions.getLng())
            setQuery(prev => {
                prev.set('language',lng)
                return prev
            })
        }
    },[params])
    const footerText = {
        en:'Project made by Milan Somyk',
        uk:'Проект зроблено Міланом Сомиком'
    }
    return (

        <>
            <div className={`movie-page-header ${theme}`}></div>
            <div className={`movie-page ${theme}`}>
                <HeaderComponent/>
                <Outlet/>
                <footer>
                    {lng==='uk'?footerText.uk:footerText.en}
                </footer>
            </div>
        </>


    )
}