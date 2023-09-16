import React from 'react';
import Pagination from '@mui/material/Pagination';
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../Hooks/reduxHooks";

const PaginationComponent = () => {
    const [querry, setQuerry] = useSearchParams({page: '1'})
    const {total_pages} = useAppSelector(state => state.movies.moviePage)
    const searh_total_pages= useAppSelector(state => state.movies.searchPage.total_pages)
    const {pathname} = useLocation()

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setQuerry(prev => {
            prev.set('page', (page).toString())
            return prev
        })
    }
    return (
        <div className={'pagination'}>
            <Pagination count={pathname==='/search'? searh_total_pages :  total_pages>500||total_pages===null? 500: total_pages} onChange={handlePageChange} page={+querry.get('page')||1}/>
        </div>
    );
};

export default PaginationComponent;