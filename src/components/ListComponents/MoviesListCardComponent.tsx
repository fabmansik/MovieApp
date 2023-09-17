import {PosterPreviewComponent} from "./PosterPreviewComponent";
import {MovieInfoComponent} from "./MovieInfoComponent";
import {StarsRatingComponent} from "./StarsRatingComponent";
import {Link, useSearchParams} from "react-router-dom";
import {FC, PropsWithChildren} from "react";
import {IMovieList} from "../../interfaces/moviesInterfaces";
import {useAppSelector} from "../../Hooks/reduxHooks";
interface IProps{
    movie:IMovieList
}
export const MoviesListCardComponent:FC<PropsWithChildren<IProps>> = ({movie}) => {
    const {poster_path, vote_average, id} = movie
    const {between, smallerThan750} = useAppSelector(state => state.params)
    const [querry] = useSearchParams()

    return(
        <Link to={`/${id}?${querry}`} preventScrollReset={false}>
            <div className='movie-card'>
                <PosterPreviewComponent poster={poster_path} id={id}/>
                <MovieInfoComponent movie={movie}/>
                <div className='movie-rating'>
                    <StarsRatingComponent vote_average={vote_average} size={between? 'small': smallerThan750? 'large' : 'medium'}/>
                </div>
            </div>
        </Link>
    )
}