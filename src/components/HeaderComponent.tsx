import {Link, useParams, useSearchParams} from "react-router-dom";
import {UserInfoComponent} from "./UserInfoComponent";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ApiServices} from "../services/ApiServices";
import {IMovieList} from "../interfaces/moviesInterfaces";

import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import LanguageComponent from "./LanguageComponent";
import {paramsActions} from "../redux/slices/paramsSlice";
import GenresFilterComponent from "./GenresFilterComponent";
import qs from "qs";

export const HeaderComponent = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const {register, watch} = useForm()

    const {theme,language} = useAppSelector(state => state.params)
    const genres = useAppSelector(state => state.movies.genres)

    const [showPop, setShowPop] = useState<string>('hidden')
    const [searchMovies, setSearchMovies] = useState<IMovieList[]>([])
    const [showGenres, setShowGenres] = useState<string>('hidden')
    const [showLanguage, setShowLanguage] = useState<string>('hidden')
    const watchPop = watch('pop-up');
    useEffect(() => {
        dispatch(paramsActions.getTheme())
        ApiServices.AxiosSearchMovie(watchPop || '', setSearchMovies,language)
    }, [watchPop])


    return (
        <header className={theme}>
            <div className={`top-header ${theme}`}>
                <div className={`menu-img ${theme}`} onClick={() => {
                    dispatch(paramsActions.setTheme())
                }}>
                    <div className={`line ${theme}`} style={{marginLeft: `${theme}`, transition: '1s'}}>
                        <img className='light-img' src='/light-bulb.png' alt='light-mode-img'/>
                        <img className='dark-img' src='/moon.png' alt='dark-mode-img'/>
                    </div>
                </div>
                <div className='header-imgs'>
                    {/*@ts-ignore*/}
                    <Link to={page !== 1 && params.id ? `/?${qs.stringify(querryParams)}` : `/?${qs.stringify(querryParams)}`}>
                        <img className='logo-img' src={`/Logo_${theme}.png`} alt="logo"></img>
                    </Link>
                </div>

                <UserInfoComponent/>
            </div>

            <div className={`low-header ${theme}`}>
                <div className={`genres-language`}>
                    <button className={`genres-button`} id={`genres-button`}
                            onClick={() => {
                        setShowGenres(prevState => {
                            if (prevState === 'hidden') {
                                return 'shown'
                            } else {
                                return 'hidden'
                            }
                        })
                        setShowLanguage('hidden')
                    }}
                    >
                        Genres
                    </button>
                    <div className={`genres ${showGenres}`} id={`genres-pop`}>
                        {genres.map(genre =>
                            <GenresFilterComponent genre={genre}/>
                        )}
                    </div>
                    <button className={`language-button`} onClick={() => {
                        setShowLanguage(prevState => {
                            if (prevState === 'hidden') {
                                return 'shown'
                            } else {
                                return 'hidden'
                            }
                        })
                        setShowGenres('hidden')
                    }}>Language
                    </button>
                    <div className={`language ${showLanguage}`}>
                        <LanguageComponent/>
                    </div>
                </div>

                <div className={`search ${theme}`}>
                    <img className={`shape-img`} src={`/shape_${theme}.png`} alt='shape'></img>
                    <input type='text' autoComplete={`off`} className={showPop}
                           placeholder={
                        language==='uk'?`Пошук фільмів`:'Find movies'
                    }
                           {...register('pop-up')} onFocus={() => setShowPop('shown')}
                           onBlur={() =>
                               setTimeout(() => {
                                   setShowPop('hidden')
                               }, 100)}
                    ></input>
                    <div className={`pop-up-menu ${showPop} ${theme}`} onClick={() => setShowPop('hidden')}>

                        {searchMovies?.map(element =>
                            <Link className={`x`} to={`/${element.id}?$${qs.stringify(params)}`} preventScrollReset={false}
                                  key={element.id}>
                                <div className={`find-element`}>
                                    {<img className={`find-poster`}
                                          src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                                          alt={'Poster'}/>}

                                    <div className={`find-info`}>
                                        <p className={`search-title`}>{element.title}</p>
                                        <p>Genres</p>
                                        {/*<GenreBadgeComponent badge={}/>*/}
                                    </div>
                                    <div className={`find-rating`}>
                                        <p>{element.vote_average.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>


                </div>
            </div>
        </header>
    )
}