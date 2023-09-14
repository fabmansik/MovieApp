import React from 'react';
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../Hooks/reduxHooks";
import {paramsActions} from "../redux/slices/paramsSlice";

const LanguageComponent = () => {
    const dispatch = useAppDispatch()
    const [query, setQuery] = useSearchParams()
    return (
        <>
            <p
                onClick={()=> {
                    setQuery(prev =>{
                        prev.set('language', `en-US`)
                        return prev
                    })
                    dispatch(paramsActions.setLng('en-US'))
                }}>
                English
            </p>
            <p
                onClick={()=> {
                    setQuery(prev =>{
                        prev.set('language', `uk`)
                        return prev
                    })
                    dispatch(paramsActions.setLng('uk'))
                }}>
                Українська
            </p>
        </>
    );
};

export default LanguageComponent;