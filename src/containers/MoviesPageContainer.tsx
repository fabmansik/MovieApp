import {Outlet, useSearchParams} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import {HeaderComponent} from "../components/HeaderComponent";
import {useMediaPredicate} from "react-media-hook";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {paramsActions} from "../redux/slices/paramsSlice";
import {IQuerry} from "../interfaces/moviesInterfaces";
import qs from "qs";

export const MoviesPageContainer = () => {

    const {language,theme} = useAppSelector(state => state.params)

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