import React, {FC, PropsWithChildren} from 'react';
import {IMovieList} from "../../interfaces/moviesInterfaces";
import {useAppSelector} from "../../Hooks/reduxHooks";
import {GenreBadgeComponent} from "../ListComponents";
interface IProps{
    movie:IMovieList
}
const SimilarMovieComponent:FC<PropsWithChildren<IProps>> = ({movie}) => {
    const genresRedux = useAppSelector(state => state.movies.genres)
    let genres:string[] = []
    movie.genre_ids.map(genre_id=>
        genresRedux.find(genre => genre.id === genre_id ? genres.push(genre.name) :  0)
    )

    return (
        <div className={'similar-movie'}>
            <img src={movie.poster_path? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: '/No-image.png'}/>
            <p>{movie.title}</p>
            <p>{new Date(movie.release_date).getFullYear()}</p>
            <p>{genres.map(genre=><GenreBadgeComponent key={genre} badge={genre}/>)}</p>
        </div>
    );
};

export default SimilarMovieComponent;