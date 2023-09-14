import {Outlet, useSearchParams} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
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