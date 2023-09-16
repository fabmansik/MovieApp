import React from 'react';
import {Link, useParams, useSearchParams} from "react-router-dom";
import qs from "qs";
import {useAppSelector} from "../Hooks/reduxHooks";

const HeaderLogoComponent = () => {
    const params = useParams()
    const [querry, setQuerry] = useSearchParams()
    const {lng, theme} = useAppSelector(state => state.params)
    const parsed = qs.parse(querry.toString())
    return (
        <div className='header-imgs'>

            <Link to={params.id ?
                `/?${querry.toString()}`
                : querry.get('page')&&querry.get('page')!== '1' ?
                    `/?${qs.stringify({...parsed, page: '1'})}` :
                    `/?language=${lng}`
            }>
                {/*{querry.get('page') !== '1' && params.id ? `/?language=${lng}&${querry.toString()}` : `/?language=${lng}&with_genres=${querry.get('with_genres')}`}*/}
                <img className='logo-img' src={`/Logo_${theme}.png`} alt="logo"></img>
            </Link>
        </div>
    );
};

export default HeaderLogoComponent;