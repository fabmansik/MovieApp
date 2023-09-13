import {Link, useParams, useSearchParams} from "react-router-dom";
import {UserInfoComponent} from "./UserInfoComponent";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ApiServices} from "../services/ApiServices";
import {IMovieList} from "../interfaces/moviesInterfaces";

import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import LanguageComponent from "./LanguageComponent";
import {paramsActions} from "../redux/slices/paramsSlice";

export const HeaderComponent = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const [querry] = useSearchParams()
    const {register, watch} = useForm()

    const {theme, smallerThan750} = useAppSelector(state => state.params)
    const genres = useAppSelector(state => state.genres.results)

    const [showPop, setShowPop] = useState<string>('hidden')
    const [searchMovies, setSearchMovies] = useState<IMovieList[]>([])
    const [showGenres, setShowGenres] = useState<string>('hidden')
    const [showLanguage, setShowLanguage] = useState<string>('hidden')
    const watchPop = watch('pop-up');

    console.log(Object.keys(genres))

    console.log(params)
    useEffect(() => {
        dispatch(paramsActions.getTheme())
        ApiServices.AxiosSearchMovie(watchPop || '', setSearchMovies)
    }, [watchPop])
    console.log(searchMovies)

    // @ts-ignore
    return (
        <header className={theme}>
            <div className={`top-header ${theme}`}>
                <div className={`menu-img ${theme}`} onClick={() => {
                    dispatch(paramsActions.changeTheme())
                }}>
                    <div className={`line ${theme}`} style={{marginLeft: `${theme}`, transition: '1s'}}>
                        <img className='light-img' src='/light-bulb.png' alt='light-mode-img'/>
                        <img className='dark-img' src='/moon.png' alt='dark-mode-img'/>
                    </div>
                </div>
                <div className='header-imgs'>
                    <Link to={querry.get('page') !== '1' && params.id ? `/?${querry.toString()}` : `/`}>
                        <img className='logo-img' src={`/Logo_${theme}.png`} alt="logo"></img>
                    </Link>
                </div>

                <UserInfoComponent/>
            </div>

            <div className={`low-header ${theme}`}>
                <div className={`genres-language`}>
                    <button className={`genres-button`} onClick={() => {
                        setShowGenres(prevState => {
                            if (prevState === 'hidden') {
                                return 'shown'
                            } else {
                                return 'hidden'
                            }
                        })
                        setShowLanguage('hidden')
                    }}>
                        Genres
                    </button>
                    <div className={`genres ${showGenres}`}>
                        {genres.map(genre => <p className={`genre-names`}>{genre.name}</p>)}
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
                        <p>English</p>
                        <p>Українська</p>
                    </div>
                </div>

                <div className={`search ${theme}`}>
                    <img className={`shape-img`} src={`/shape_${theme}.png`} alt='shape'></img>
                    <input type='text' autoComplete={`off`} className={showPop}
                           placeholder={`Пошук фільмів`} {...register('pop-up')} onFocus={() => setShowPop('shown')}
                           onBlur={() =>
                               setTimeout(() => {
                                   setShowPop('hidden')
                               }, 100)}
                    ></input>
                    <div className={`pop-up-menu ${showPop} ${theme}`} onClick={() => setShowPop('hidden')}>

                        {searchMovies?.map(element =>
                            <Link className={`x`} to={`/${element.id}?${querry.toString()}`} preventScrollReset={false}
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