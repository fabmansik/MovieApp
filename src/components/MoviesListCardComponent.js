import {PosterPreviewComponent} from "./PosterPreviewComponent";
import {MovieInfoComponent} from "./MovieInfoComponent";
import {StarsRatingComponent} from "./StarsRatingComponent";
import {Link, useParams} from "react-router-dom";
import {useContext} from "react";
import {GenresContext} from "./MoviesListComponent";
import {Context750, ContextBetween} from "../containers/MoviesPageContainer";

export const MoviesListCardComponent = ({movie}) => {
    const {poster_path, vote_average, vote_count, id} = movie
    const genres = (useContext(GenresContext))
    const small750 = useContext(Context750)
    const params = useParams()
    const between = useContext(ContextBetween)
    return(
        <Link to={`/${params.page}/${id}`} state={{genres}} preventScrollReset={false}>
            <div className='movie-card'>
                <PosterPreviewComponent poster={poster_path}/>
                <MovieInfoComponent movie={movie}/>
                <div className='movie-rating'>
                    <StarsRatingComponent vote_count={vote_count} vote_average={vote_average} size={between? 'small': small750? 'large' : 'medium'}/>
                </div>
            </div>
        </Link>
    )
}