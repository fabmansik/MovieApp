export const PosterPreviewComponent = ({poster}) => {
    return(
        <div className='poster-div'>
            <img className='poster-img' src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="poster"/>
        </div>
    )
}