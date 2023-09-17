import React from 'react';
import {MoviesListCardComponent} from "../components";
import PaginationComponent from "../components/ListComponents/PaginationComponent";

const FavouritesPage = () => {
    return (
        <>
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
    );
};

export default FavouritesPage;