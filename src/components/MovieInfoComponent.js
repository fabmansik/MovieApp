import {useContext} from "react";
import {GenresContext} from "./MoviesListComponent";
import {GenreBadgeComponent} from "./GenreBadgeComponent";
export const MovieInfoComponent = ({movie}) => {
    const genresContext = (useContext(GenresContext))
    let genres = []
    movie.genre_ids.map(genre_id=>
        genresContext.find(genre => genre.id === genre_id ? genres.push(genre.name) :  0)
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