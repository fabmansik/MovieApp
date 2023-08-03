import {Outlet} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import {HeaderComponent} from "../components/HeaderComponent";
import {useMediaPredicate} from "react-media-hook";
export const Context750 = createContext()
export const Context1000 = createContext()
export const ContextBetween = createContext()
export const ThemeContext = createContext()
export const MoviesPageContainer = () => {
    const smallerThan750 = useMediaPredicate("(max-width: 750px)")
    const smallerThan1000 = useMediaPredicate("(max-width: 1000px)")
    const between = useMediaPredicate('(max-width: 1000px) and (min-width: 751px)')
    const [theme, setTheme] = useState('light')
    let localTheme = localStorage.getItem('theme')

    useEffect(()=>{
        localTheme? setTheme(localTheme) : localStorage.setItem('theme',theme)
    },[])

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            <ContextBetween.Provider value={between}>
                <Context1000.Provider value={smallerThan1000}>
                    <Context750.Provider value={smallerThan750}>
                        <div className={`movie-page-header ${theme}`}> </div>
                        <div className={`movie-page ${theme}`}>
                            <HeaderComponent/>
                            <Outlet/>
                            <footer>
                                Project made by Milan Somyk
                            </footer>
                        </div>
                    </Context750.Provider>
                </Context1000.Provider>
            </ContextBetween.Provider>
        </ThemeContext.Provider>
    )
}