import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {UserInfoComponent} from "./UserInfoComponent";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ApiServices} from "../services/ApiServices";
import {IMovieList} from "../interfaces/moviesInterfaces";
import {GenresFilterComponent} from "./GenresFilterComponent"

import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import LanguageComponent from "./LanguageComponent";
import {paramsActions} from "../redux/slices/paramsSlice";
import qs from "qs";

export const HeaderComponent = () => {
    const headerText = {
        en:{
            genrePop:'All Genres',
        },
        uk:{
            genrePop:'Всі жанри',
        }
    }
    const dispatch = useAppDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const [querry, setQuery] = useSearchParams()
    const {register, watch} = useForm()
    const {theme, lng} = useAppSelector(state => state.params)
    const genres = useAppSelector(state => state.movies.genres)
    const parsed = qs.parse(querry.toString())
    console.log(parsed.with_genres)
    const [showPop, setShowPop] = useState<string>('hidden')
    const [searchMovies, setSearchMovies] = useState<IMovieList[]>([])
    const [showGenres, setShowGenres] = useState<string>('hidden')
    const [showLanguage, setShowLanguage] = useState<string>('hidden')
    const [showGenrePop, setShowGenrePop] = useState<boolean>(true)
    const watchPop = watch('pop-up');

    console.log(Object.keys(genres))

    useEffect(() => {
        dispatch(paramsActions.getTheme())
        console.log(querry.get('with_genres'))
        console.log(querry.toString())
        ApiServices.AxiosSearchMovie(watchPop || '', setSearchMovies,lng)
    }, [watchPop])
    useEffect(()=>{
        if(parsed.with_genres){
            setShowGenrePop(false)
        }else{
            setShowGenrePop(true)
        }
    },[querry.toString()])


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
                    <Link to={querry.get('page') !== '1' && params.id ? `/?language=${lng}&${querry.toString()}` : `/?language=${lng}&with_genres=${querry.get('with_genres')}`}>
                        <img className='logo-img' src={`/Logo_${theme}.png`} alt="logo"></img>
                    </Link>
                </div>

                <UserInfoComponent/>
            </div>

            <div className={`low-header ${theme}`}>
                <div className={`genres-language`}>

                    <button className={`language-button`} onClick={() => {
                        setShowLanguage(prevState => {
                            if (prevState === 'hidden') {
                                return 'shown'
                            } else {
                                return 'hidden'
                            }
                        })
                        setShowGenres('hidden')
                    }}
                    onBlur={()=>{
                        setTimeout(()=>{
                            setShowLanguage('hidden')
                        },300)
                    }}>{lng==='uk'?'Українська':'English'}
                    </button>
                    <div className={`language ${showLanguage}`}>
                        <LanguageComponent/>
                    </div>
                    <button className={`genres-button`} onClick={() => {
                        setShowGenres(prevState => {
                            if (prevState === 'hidden') {
                                return 'shown'
                            } else {
                                return 'hidden'
                            }
                        })
                        setShowLanguage('hidden')
                    }}
                            onBlur={()=>{
                                setTimeout(()=>{
                                    setShowGenres('hidden')
                                },300)
                            }}
                    >
                        {genres.map(element=>{
                            if (querry.get('with_genres')===`${element.id}`){
                                return element.name
                            }else{
                            }})
                        }
                        {showGenrePop && (lng==='uk'?headerText.uk.genrePop:headerText.en.genrePop)}

                    </button>
                    <div className={`genres ${showGenres}`} id={`genres-pop`}>
                        {genres.map(genre =>
                            <GenresFilterComponent genre={genre}/>
                        )}
                        {!showGenrePop && (lng==='uk'?<p
                            className={`genre-names`}
                            onClick={()=> {
                                setQuery(prev =>{
                                    prev.set('with_genres', ``)
                                    prev.set('page','1')
                                    return prev
                                })
                                if(params.id){
                                    navigate(`/?${querry.toString()}`)
                                }
                            }}>{headerText.uk.genrePop}</p>:<p className={`genre-names`}>{headerText.en.genrePop}</p>)}
                    </div>
                </div>

                <div className={`search ${theme}`}>
                    <img className={`shape-img`} src={`/shape_${theme}.png`} alt='shape'></img>
                    <input type='text' autoComplete={`off`} className={showPop}
                           placeholder={lng==='uk'?`Пошук фільмів`:'Find movies'} {...register('pop-up')} onFocus={() => setShowPop('shown')}
                           onBlur={() =>
                               setTimeout(() => {
                                   setShowPop('hidden')
                               }, 100)}
                    ></input>
                    <div className={`pop-up-menu ${showPop} ${theme}`} onClick={() => setShowPop('hidden')}>

                        {searchMovies?.map(element =>
                            <Link className={`x`} to={`/${element.id}?language=${lng}&${querry.toString()}`} preventScrollReset={false}
                                  key={element.id}>
                                <div className={`find-element`}>
                                    {<img className={`find-poster`}
                                          src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                                          alt={'Poster'}/>}

                                    <div className={`find-info`}>
                                        <p className={`search-title`}>{element.title}</p>
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