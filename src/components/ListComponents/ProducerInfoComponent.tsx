import React from 'react';
import {useAppSelector} from "../../Hooks/reduxHooks";

const ProducerInfoComponent = () => {
    const {name, profile_path} = useAppSelector(state => state.movies.producer)
    const {lng, theme} = useAppSelector(state => state.params)
    const text = {
        en:{
            text:`Movies directed by ${name}`
        },
        uk:{
            text:`Фільми зняті продюсером ${name}`
        }
    }
    return (
        <div className={`person-info ${theme}`}>
            <img src={profile_path? `https://image.tmdb.org/t/p/w500/${profile_path}`: '/No-image.png'}/>
            <h1>{lng==='uk'?text.uk.text:text.en.text}</h1>
        </div>
    );
};

export default ProducerInfoComponent;