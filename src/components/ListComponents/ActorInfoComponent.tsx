import React from 'react';
import {useAppSelector} from "../../Hooks/reduxHooks";

const ActorInfoComponent = () => {
    const {name, profile_path} = useAppSelector(state => state.movies.actor)
    const {lng, theme} = useAppSelector(state => state.params)
    const text = {
        en:{
            text:`Movies with ${name}`
        },
        uk:{
            text:`Фільми з участю ${name}`
        }
    }
    return (
        <div className={`person-info ${theme}`}>
            <img src={profile_path? `https://image.tmdb.org/t/p/w500/${profile_path}`: '/No-image.png'}/>
            <h1>{lng==='uk'?text.uk.text:text.en.text}</h1>
        </div>
    );
};

export default ActorInfoComponent;