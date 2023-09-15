import React from 'react';
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";
import {useSearchParams} from "react-router-dom";
import {paramsActions} from "../redux/slices/paramsSlice";

const FilterComponent = () => {
    const dispatch = useAppDispatch()
    const {lng} = useAppSelector(state => state.params)
    const [query, setQuery] = useSearchParams()
    console.log(query.get('sort_by'))
    return (
        <>
            {query.get('sort_by')!=='primary_release_date.desc'&&<p
                onClick={() => {
                    setQuery(prev => {
                        prev.set('sort_by', `primary_release_date.desc`)
                        return prev
                    })
                }}>
                Release Date
            </p>}
            {query.get('sort_by')!=='vote_average.desc'&&<p
                onClick={() => {
                    setQuery(prev => {
                        prev.set('sort_by', `vote_average.desc`)
                        return prev
                    })
                }}>
                Average Vote
            </p>}
            {(query.get('sort_by')!==(''||'popularity.desc')&&query.get('sort_by'))&&<p
                onClick={() => {
                    setQuery(prev => {
                        prev.set('sort_by', `popularity.desc`)
                        return prev
                    })
                }}>
                Popularity
            </p>}
        </>
    );
};

export default FilterComponent;