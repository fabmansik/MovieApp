import React from 'react';
import Pagination from '@mui/material/Pagination';
import {useSearchParams} from "react-router-dom";

const PaginationComponent = () => {
    const [querry, setQuerry] = useSearchParams({page: '1'})
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setQuerry(prev => {
            prev.set('page', (page).toString())
            return prev
        })
    }
    return (
        <div className={'pagination'}>
            <Pagination count={500} onChange={handlePageChange} page={+querry.get('page')}/>
        </div>
    );
};

export default PaginationComponent;