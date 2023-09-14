import React from 'react';
import Pagination from '@mui/material/Pagination';
import {paramsActions} from "../../redux/slices/paramsSlice";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {useSearchParams} from "react-router-dom";

const PaginationComponent = () => {
    const page = useAppSelector(state => state.params.querryParams.page)
    const dispatch = useAppDispatch()
    const [query, setQuery]=useSearchParams()
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(paramsActions.setPage(page))
    }
    return (
        <div>
            <Pagination count={500} onChange={handlePageChange} page={page}/>
        </div>
    );
};

export default PaginationComponent;