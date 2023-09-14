import React, {FC, PropsWithChildren} from 'react';
import {IGenre} from "../interfaces/moviesInterfaces";
import {useSearchParams} from "react-router-dom";
import {set} from "react-hook-form";
import {useAppDispatch} from "../Hooks/reduxHooks";
import {paramsActions} from "../redux/slices/paramsSlice";
interface IProps{
    genre:IGenre
}
const GenresFilterComponent:FC<PropsWithChildren<IProps>> = ({genre}) => {
    const dispatch = useAppDispatch()
    const [query, setQuery]= useSearchParams()
    return (
            <p
                className={`genre-names`}
                key={`${genre.id}`}
                onClick={()=> {
                    setQuery(prev =>{
                        prev.set('with_genres', `${genre.id}`)
                        return prev
                    })
                }}
            >{genre.name}</p>
    );
};

export default GenresFilterComponent;