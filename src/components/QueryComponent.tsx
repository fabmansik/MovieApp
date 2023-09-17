import React from 'react';
import {useAppSelector} from "../Hooks/reduxHooks";
import {useSearchParams} from "react-router-dom";

const QueryComponent = () => {
    const queryText = {
        en:`Found by request:`,uk:`Знайдено по запиту:`
    }
    const [query]=useSearchParams()
    const {lng} = useAppSelector(state => state.params)
    return (
        <div className={'query-div'}>
            <h1>
                {lng==='uk'?queryText.uk:queryText.en}
                '{query.get('query')}'
            </h1>
        </div>
    );
};

export default QueryComponent;