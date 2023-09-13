import {GenreBadgeComponent} from "./GenreBadgeComponent";
import {useAppSelector} from "../../Hooks/reduxHooks";
import {FC, PropsWithChildren} from "react";
import {IMovieList} from "../../interfaces/moviesInterfaces";
interface IProps{
    movie:IMovieList
}
export const MovieInfoComponent:FC<PropsWithChildren<IProps>> = ({movie}) => {
    const genresRedux = useAppSelector(state => state.genres.results)
    let genres:string[] = []
    movie.genre_ids.map(genre_id=>
        genresRedux.find(genre => genre.id === genre_id ? genres.push(genre.name) :  0)
    )
    return(
        <div className='movie-info'>
            <div className='movie-title'>
                <h4>{movie.title}</h4>
            </div>
            <div className='movie-badges'>
                {genres.map(genre=><GenreBadgeComponent key={genre} badge={genre}/>
                )}
            </div>
            <div className='movie-description'>
                {movie.overview}
            </div>
        </div>
    )
}