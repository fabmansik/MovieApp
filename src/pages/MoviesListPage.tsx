import React, {useEffect} from "react";
import {MoviesListCardComponent} from "../components";
import { useLocation,  useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import PaginationComponent from "../components/ListComponents/PaginationComponent";
import ProducerInfoComponent from "../components/ListComponents/ProducerInfoComponent";
import ActorInfoComponent from "../components/ListComponents/ActorInfoComponent";
import QueryComponent from "../components/QueryComponent";
import {favouriteActions} from "../redux/slices/favouriteSlice";

export const MoviesListPage = () => {

    const {moviePage, searchPage} = useAppSelector(state => state.movies)
    const {lng} = useAppSelector(state => state.params)
    const dispatch = useAppDispatch()
    const [querry] = useSearchParams()
    const queryProducer = querry.get('with_crew')
    const queryActor = querry.get('with_cast')
    const queryQuery = querry.get('query')
    console.log(queryQuery)
    const {pathname} = useLocation()
    useEffect(() => {
        if(querry.get('query')&&moviePage!==searchPage){
            dispatch(movieActions.searchMovies(querry.toString()))
        }else{
            dispatch(movieActions.getMovies(querry.toString()))
        }
        dispatch(movieActions.getGenres(lng||querry.get('language')))
        if(!queryProducer){
            dispatch(movieActions.withProducer(null))
        }
        if(!queryActor){
            dispatch(movieActions.withActor(null))
        }
        dispatch(favouriteActions.getFavourite())
    }, [querry.toString()])

    return (
        <>
            {queryProducer?<ProducerInfoComponent/>:''}
            {queryActor?<ActorInfoComponent/>:''}
            {queryQuery?<QueryComponent/>:''}

            <div className='movie-list'>
                {pathname==='/search'?
                    (searchPage.results !== null ?
                        searchPage.results.map(movie => <MoviesListCardComponent key={movie.id} movie={movie}/>) :
                        <p>Loading...</p>):
                    (moviePage.results !== null ?
                        moviePage.results.map(movie => <MoviesListCardComponent key={movie.id} movie={movie}/>) :
                        <p>Loading...</p>)}
            </div>
            <div className='page-info'>
                <PaginationComponent/>
            </div>

        </>


    )
}