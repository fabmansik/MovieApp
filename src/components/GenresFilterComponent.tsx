import React, {FC, PropsWithChildren} from 'react';
import {IGenre} from "../interfaces/moviesInterfaces";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {set} from "react-hook-form";
import {useAppDispatch} from "../Hooks/reduxHooks";
import {paramsActions} from "../redux/slices/paramsSlice";
interface IProps{
    genre:IGenre
}
export const GenresFilterComponent:FC<PropsWithChildren<IProps>> = ({genre}) => {
    const {id} = useParams()
    const [query, setQuery]= useSearchParams()
    const navigate = useNavigate()
    return (
        <p
            className={`genre-names ${+query.get('with_genres')===genre.id?'disabled':'enabled'}`}
            onClick={()=> {
                setQuery(prev =>{
                    prev.set('with_genres', `${genre.id}`)
                    prev.set('page','1')
                    return prev
                })
                if(id){
                    navigate(`/?${query.toString()}`)
                }
            }}
        >{genre.name}</p>
    );
};

