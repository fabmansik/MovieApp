import {Outlet, useSearchParams} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import {HeaderComponent} from "../components/HeaderComponent";
import {useMediaPredicate} from "react-media-hook";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {paramsActions} from "../redux/slices/paramsSlice";
import {IQuerry} from "../interfaces/moviesInterfaces";
import qs from "qs";

export const MoviesPageContainer = () => {

    const {querryParams} = useAppSelector(state => state.params)
    const {language, page, with_genres, theme} = querryParams
    const [querry, setQuery]=useSearchParams({language: '', page: `1`, with_genres:``})
    useEffect(()=>{
        paramsActions.getDefaults()
        setQuery(prev => {
            prev.set('language','')
            return prev
        })
    },[])

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
                    {language==='uk'?footerText.uk:footerText.en}
                </footer>
            </div>
        </>


    )
}