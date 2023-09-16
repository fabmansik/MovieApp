import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {UserInfoComponent} from "./UserInfoComponent";
import React, {useEffect, useState} from "react";
import {set, useForm} from "react-hook-form";
import {ApiServices} from "../services/ApiServices";
import {IMovieList} from "../interfaces/moviesInterfaces";
import {GenresFilterComponent} from "./GenresFilterComponent"

import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import LanguageComponent from "./LanguageComponent";
import {paramsActions} from "../redux/slices/paramsSlice";
import qs from "qs";
import FilterComponent from "./FilterComponent";
import ThemeComponent from "./ThemeComponent";
import HeaderLogoComponent from "./HeaderLogoComponent";
import {movieActions} from "../redux/slices/movieSlice";

export const HeaderComponent = () => {
    const headerText = {
        en: {
            genrePop: 'All Genres',
        },
        uk: {
            genrePop: 'Всі жанри',
        }
    }
    const dispatch = useAppDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const [querry, setQuery] = useSearchParams()
    const {register, watch} = useForm()
    const {theme, lng, smallerThan750} = useAppSelector(state => state.params)
    const genres = useAppSelector(state => state.movies.genres)
    const parsed = qs.parse(querry.toString())
    const [showPop, setShowPop] = useState<string>('hidden')
    const [searchMovies, setSearchMovies] = useState<IMovieList[]>([])
    const [showGenres, setShowGenres] = useState<string>('hidden')
    const [showLanguage, setShowLanguage] = useState<string>('hidden')
    const [showFilter, setShowFilter] = useState<string>('hidden')
    const [showGenrePop, setShowGenrePop] = useState<boolean>(true)
    const watchPop = watch('pop-up');
    console.log(qs.stringify({
        ...parsed,
        page: '1',
        query: watchPop
    }))
    useEffect(() => {
        dispatch(paramsActions.getTheme())
        ApiServices.AxiosSearchMovie(watchPop || '', setSearchMovies, lng)
    }, [watchPop])
    useEffect(() => {
        if (parsed.with_genres) {
            setShowGenrePop(false)
        } else {
            setShowGenrePop(true)
        }
    }, [querry.toString()])

    return (
        <header className={theme}>
            <div className={`top-header ${theme}`}>
                <ThemeComponent/>
                <HeaderLogoComponent/>
                <UserInfoComponent/>
            </div>


            <div className={`low-header ${theme}`}>
                <div className={`genres-language-filter`}>
                    <div className={'language-div'}>
                        <button className={`language-button`} onClick={() => {
                            setShowLanguage(prevState => {
                                if (prevState === 'hidden') {
                                    return 'shown'
                                } else {
                                    return 'hidden'
                                }
                            })
                            setShowFilter('hidden')
                            setShowGenres('hidden')
                        }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowLanguage('hidden')
                                    }, 300)
                                }}>{lng === 'uk' ? 'Українська' : 'English'}
                        </button>
                        <div className={`language ${showLanguage}`}>
                            <LanguageComponent/>
                        </div>
                    </div>

                    <button className={`genres-button`} onClick={() => {
                        setShowGenres(prevState => {
                            if (prevState === 'hidden') {
                                return 'shown'
                            } else {
                                return 'hidden'
                            }
                        })
                        setShowFilter('hidden')
                        setShowLanguage('hidden')
                    }}
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowGenres('hidden')
                                }, 300)
                            }}
                    >
                        {genres.map(element => {
                            if (querry.get('with_genres') === `${element.id}`) {
                                return element.name
                            } else {
                            }
                        })
                        }
                        {showGenrePop && (lng === 'uk' ? headerText.uk.genrePop : headerText.en.genrePop)}

                    </button>
                    <div className={`genres ${showGenres}`} id={`genres-pop`}>
                        {genres.map(genre =>
                            <GenresFilterComponent genre={genre} key={genre.id}/>
                        )}
                        {!showGenrePop && (lng === 'uk' ? <p
                                className={`genre-names`}
                                onClick={() => {
                                    setQuery(prev => {
                                        prev.set('with_genres', ``)
                                        prev.set('page', '1')
                                        return prev
                                    })
                                    if (params.id) {
                                        navigate(`/?${querry.toString()}`)
                                    }
                                }}>{headerText.uk.genrePop}</p> :
                            <p className={`genre-names`}>{headerText.en.genrePop}</p>)}
                    </div>
                    <div className={`filter-div`}>
                        <button className={`filter-button`} onClick={() => {
                            setShowFilter(prevState => {
                                if (prevState === 'hidden') {
                                    return 'shown'
                                } else {
                                    return 'hidden'
                                }
                            })
                            setShowLanguage('hidden')
                            setShowGenres('hidden')
                        }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowFilter('hidden')
                                    }, 300)
                                }}>{querry.get('sort_by') === '' ? 'Popularity' :
                            querry.get('sort_by') === 'primary_release_date.desc' ? 'Release Date' :
                                querry.get('sort_by') === 'vote_average.desc' ? 'Average Vote' : 'Popularity'}
                        </button>
                        <div className={`filter ${showFilter}`}>
                            <FilterComponent/>
                        </div>
                    </div>

                </div>

                <div className={`search ${theme}`}>
                    <img className={`shape-img`} src={`/shape_${theme}.png`} alt='shape'></img>
                    <input type='text' autoComplete={`off`} className={showPop}
                           placeholder={lng === 'uk' ? `Пошук фільмів` : 'Find movies'} {...register('pop-up')}
                           onFocus={() => setShowPop('shown')}
                           onBlur={() =>
                               setTimeout(() => {
                                   setShowPop('hidden')
                               }, 100)}
                    />
                    <div className={`pop-up-menu ${showPop} ${theme}`} onClick={() => setShowPop('hidden')}>

                        {searchMovies?.slice(0, 10).map(element =>
                            <Link className={`x`} to={`/${element.id}?${querry.toString()}`}
                                  preventScrollReset={false}
                                  key={element.id}>
                                <div className={`find-element`}>
                                    {<img className={`find-poster`}
                                          src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                                          alt={'Poster'}/>}

                                    <div className={`find-info`}>
                                        <p className={`search-title`}>{element.title}</p>
                                    </div>
                                    <div className={`find-rating`}>
                                        <p>{element.vote_average.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                        {searchMovies.length> 10 &&
                            <div className={`find-more`} onClick={() => dispatch(movieActions.getMovies(qs.stringify({
                                ...parsed,
                                page: '1',
                                query: watchPop
                            })))}>
                                More Movies
                            </div>}
                    </div>
                </div>
            </div>
        </header>
    )
}