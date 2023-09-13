import {Outlet} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import {HeaderComponent} from "../components/HeaderComponent";
import {useMediaPredicate} from "react-media-hook";
import {useAppSelector} from "../Hooks/reduxHooks";

export const MoviesPageContainer = () => {
    const { theme} = useAppSelector(state => state.params)

    return (

        <>
            <div className={`movie-page-header ${theme}`}></div>
            <div className={`movie-page ${theme}`}>
                <HeaderComponent/>
                <Outlet/>
                <footer>
                    Project made by Milan Somyk
                </footer>
            </div>
        </>


    )
}