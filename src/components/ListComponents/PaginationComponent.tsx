import React from 'react';
import Pagination from '@mui/material/Pagination';
import {paramsActions} from "../../redux/slices/paramsSlice";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
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
        <div>
            <Pagination count={500} onChange={handlePageChange} page={+querry.get('page')}/>
        </div>
    );
};

export default PaginationComponent;