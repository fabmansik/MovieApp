import React, {FC, PropsWithChildren, useState} from 'react';
import {ICast} from "../../interfaces/moviesInterfaces";
import {set} from "react-hook-form";
import {useAppSelector} from "../../Hooks/reduxHooks";

interface IProps {
    person: ICast
}

const ActorsComponent: FC<PropsWithChildren<IProps>> = ({person}) => {
    const {cast}= useAppSelector(state => state.movies.credits)
    const [showImage, setShowImage] =useState<string>('hidden')
    return (
        <>

            <div className={`person-name`}
               onMouseEnter={()=>{
                   setShowImage('shown')}}
               onMouseLeave={()=>{
                   setShowImage('hidden')
               }}
        >
            <div className={`person-image ${showImage}`}>
                <img src={person.profile_path? `https://image.tmdb.org/t/p/w500/${person.profile_path}`: '/No-image.png'}/>
            </div>
                <span>{person.name}</span>{person.order<cast.length-1?',':''} &nbsp;
        </div>

        </>

    );
};

export default ActorsComponent;