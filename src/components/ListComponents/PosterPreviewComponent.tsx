import {FC, PropsWithChildren} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {favouriteActions} from "../../redux/slices/favouriteSlice";
interface IProps{
    poster:string
    id:number
}
export const PosterPreviewComponent:FC<PropsWithChildren<IProps>> = ({poster,id}) => {
    const {pathname} = useLocation()
    const [query]=useSearchParams()
    const dispatch = useAppDispatch()
    const {favourite} = useAppSelector(state => state.favourites)
    const isFavorite = favourite.find(element=> element===id)
    return(
        <div className='poster-div'>
            <div className={'image-div'}>
                {poster?
                    <img className='poster-img' src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="poster" />
                    :
                    <img className='poster-img' src={'/No-Image.png'} alt="poster"/>}

            </div>
            <Link to={pathname+`?${query.toString()}`} preventScrollReset={true}>
                <div
                    id={`heart`}
                    className={isFavorite?`active`:`none-active`}
                    onClick={()=>dispatch(favouriteActions.addFavourite(id))}
                ></div>
            </Link>

        </div>
    )
}