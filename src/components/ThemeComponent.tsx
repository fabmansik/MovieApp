import React from 'react';
import {paramsActions} from "../redux/slices/paramsSlice";
import {useAppDispatch, useAppSelector} from "../Hooks/reduxHooks";

const ThemeComponent = () => {
    const dispatch = useAppDispatch()
    const {theme}=useAppSelector(state => state.params)
    return (
        <div className={`menu-img ${theme}`} onClick={() => {
            dispatch(paramsActions.changeTheme())
        }}>
            <div className={`line ${theme}`} style={{marginLeft: `${theme}`, transition: '1s'}}>
                <img className='light-img' src='/light-bulb.png' alt='light-mode-img'/>
                <img className='dark-img' src='/moon.png' alt='dark-mode-img'/>
            </div>
        </div>
    );
};

export default ThemeComponent;