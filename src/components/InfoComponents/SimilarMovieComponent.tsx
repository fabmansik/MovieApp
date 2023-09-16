import React, {FC, PropsWithChildren} from 'react';
import {IGenre, IMovieList} from "../../interfaces/moviesInterfaces";
import {useAppSelector} from "../../Hooks/reduxHooks";
import {GenreBadgeComponent} from "../ListComponents";
import {Link} from "react-router-dom";

interface IProps {
    movie: IMovieList
}

const SimilarMovieComponent: FC<PropsWithChildren<IProps>> = ({movie}) => {
    const genresRedux = useAppSelector(state => state.movies.genres)
    const {lng} = useAppSelector(state => state.params)
    let genres: IGenre[] = []
    movie.genre_ids.map(genre_id =>
        genresRedux.find(genre => genre.id === genre_id ? genres.push(genre) : 0)
    )

    return (
        <div className={'similar-movie'}>
            <Link to={`/${movie.id}?language=${lng}`}>
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/No-image.png'}/>
                <p>{movie.title}</p>
                <p>{new Date(movie.release_date).getFullYear()}</p>
                <p>{genres.map(genre => <GenreBadgeComponent key={genre.id} badge={genre}/>)}</p>
            </Link>
        </div>
    );
};

export default SimilarMovieComponent;