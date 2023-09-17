import React, {FC, PropsWithChildren} from 'react';
import {IGenre} from "../interfaces/moviesInterfaces";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
interface IProps{
    genre:IGenre
}
export const GenresFilterComponent:FC<PropsWithChildren<IProps>> = ({genre}) => {
    const {id, search} = useParams()
    const [query, setQuery]= useSearchParams()
    const navigate = useNavigate()
    return (
        <p
            className={`genre-names ${+query.get('with_genres')===genre.id?'disabled':'enabled'}`}
            onClick={()=> {
                setQuery(prev =>{
                    prev.set('with_genres', `${genre.id}`)
                    prev.set('page','1')
                    prev.delete('query')
                    return prev
                })
                if(id||search){
                    navigate(`/?${query.toString()}`)
                }
            }}
        >{genre.name}</p>
    );
};

