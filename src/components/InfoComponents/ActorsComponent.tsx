import React, {FC, PropsWithChildren, useState} from 'react';
import {ICast} from "../../interfaces/moviesInterfaces";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {useNavigate} from "react-router-dom";

interface IProps {
    person: ICast
    length: number
}

const ActorsComponent: FC<PropsWithChildren<IProps>> = ({person, length}) => {
    const {lng} = useAppSelector(state => state.params)
    const [showImage, setShowImage] = useState<string>('hidden')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <>

            <div className={`person-name`}
                 onMouseEnter={() => {
                     setShowImage('shown')
                 }}
                 onMouseLeave={() => {
                     setShowImage('hidden')
                 }}
                 onClick={() => {
                     dispatch(movieActions.withActor(person))
                     navigate(`/?language=${lng}&with_cast=${person.id}`)
                 }}
            >
                <div className={`person-image ${showImage}`}>
                    <img
                        src={person.profile_path ? `https://image.tmdb.org/t/p/w500/${person.profile_path}` : '/No-image.png'}/>
                </div>
                <span>{person.name}</span>{person.order < length - 1 && person.order < 19 ? ',' : ''} &nbsp;
            </div>

        </>

    );
};

export default ActorsComponent;