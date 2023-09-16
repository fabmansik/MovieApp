import React, {FC, PropsWithChildren, useState} from 'react';
import {ICast, ICrew} from "../../interfaces/moviesInterfaces";
import {set} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {useNavigate} from "react-router-dom";

interface IProps {
    person: ICrew
    length: number
}

const CrewComponent: FC<PropsWithChildren<IProps>> = ({person, length}) => {
    const {lng}= useAppSelector(state => state.params)
    const [showImage, setShowImage] =useState<string>('hidden')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <>

            <div className={`person-name`}
               onMouseEnter={()=>{
                   setShowImage('shown')}}
               onMouseLeave={()=>{
                   setShowImage('hidden')
               }}
                 onClick={() => {
                     dispatch(movieActions.withProducer(person))
                     navigate(`/?language=${lng}&with_crew=${person.id}`)
                 }}
        >
            <div className={`person-image ${showImage}`}>
                <img src={person.profile_path? `https://image.tmdb.org/t/p/w500/${person.profile_path}`: '/No-image.png'}/>
            </div>
                <span>{person.name}</span>{person.order<length-1 && person.order<9?',':''} &nbsp;
        </div>

        </>

    );
};

export default CrewComponent;