import React, {useEffect} from "react";
import {MoviesListCardComponent} from "../components/ListComponents/MoviesListCardComponent";
import {ScrollRestoration, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import PaginationComponent from "../components/ListComponents/PaginationComponent";
import ProducerInfoComponent from "../components/ListComponents/ProducerInfoComponent";
import ActorsComponent from "../components/InfoComponents/ActorsComponent";
import ActorInfoComponent from "../components/ListComponents/ActorInfoComponent";

export const MoviesListPage = () => {

    const {moviePage, producer} = useAppSelector(state => state.movies)

    const {lng} = useAppSelector(state => state.params)
    const dispatch = useAppDispatch()
    const [querry, setQuerry] = useSearchParams()
    const queryProducer = querry.get('with_crew')
    const queryActor = querry.get('with_cast')
    useEffect(() => {
        dispatch(movieActions.getMovies(querry.toString()))
        // ApiServices.AxiosGetMoviesExactPage(setMoviesList, setGetInfo, page.page))
        dispatch(movieActions.getGenres(lng||querry.get('language')))
        if(!queryProducer){
            dispatch(movieActions.withProducer(null))
        }
        if(!queryActor){
            dispatch(movieActions.withActor(null))
        }
    }, [querry.toString()])

    return (
        <>
            <ScrollRestoration/>
            {queryProducer?<ProducerInfoComponent/>:''}
            {queryActor?<ActorInfoComponent/>:''}
            <div className='movie-list'>
                {
                    moviePage.results !== null ?
                        moviePage.results.map(movie => <MoviesListCardComponent key={movie.id} movie={movie}/>) :
                        <p>Loading...</p>}
            </div>
            <div className='page-info'>
                <PaginationComponent/>
            </div>

        </>


    )
}