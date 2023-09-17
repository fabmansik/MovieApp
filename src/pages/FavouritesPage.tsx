import React, {useEffect} from 'react';
import {MoviesListCardComponent} from "../components";
import PaginationComponent from "../components/ListComponents/PaginationComponent";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {ScrollRestoration, useSearchParams} from "react-router-dom";
import {favouriteActions} from "../redux/slices/favouriteSlice";
import {movieActions} from "../redux/slices/movieSlice";

const FavouritesPage = () => {
    const favText = {
        en: {
            noFav: 'No added favourite movies',
            fav: 'Favourites:',
        },
        uk: {
            noFav: 'У улюблені нічого не додано',
            fav: 'Улюблені:',
        }
    }
    const {favourite, results} = useAppSelector(state => state.favourites)
    const {lng} = useAppSelector(state => state.params)
    const dispatch = useAppDispatch()
    const [querry] = useSearchParams()
    const queryQuery = querry.get('query')
    console.log(queryQuery)
    useEffect(() => {
        dispatch(favouriteActions.getFavourite())
    }, [])
    useEffect(() => {
        favourite.map(element => dispatch(favouriteActions.getDetails({id: element, options: lng})))
        dispatch(movieActions.getGenres(lng))
    }, [favourite, lng])
    return (
        <>
            <ScrollRestoration/>
            {favourite.length === 0&&
                <div className={`no-favs`}>
                    <h1>
                        {lng === 'uk' ? favText.uk.noFav : favText.en.noFav}
                    </h1>
                </div>}
            {favourite.length !==0&&
                <div className={`favs`}>
                    <h1>
                        {lng === 'uk' ? favText.uk.fav : favText.en.fav}
                    </h1>
                </div>}
            <div className='fav-movie-list'>

                {(results !== null ?
                    results.map(movie => <MoviesListCardComponent key={movie.id} movie={movie}/>) :
                    <p>Loading...</p>)}

            </div>
            <div className='page-info'>
                <PaginationComponent/>
            </div>
        </>
    );
};

export default FavouritesPage;