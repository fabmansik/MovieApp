import {Badge} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {FC, PropsWithChildren, useContext} from "react";
import {useAppSelector} from "../../Hooks/reduxHooks";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import qs from "qs";
interface IProps{
    badge:string
}
export const GenreBadgeComponent:FC<PropsWithChildren<IProps>> = ({badge}) => {
    const theme = useAppSelector(state => state.params.theme)
    const [query, setQuery] = useSearchParams()
    const navigate = useNavigate()
    return(
            <Badge
                color={theme === "light"? 'secondary' : 'dark'}
                className='badge'
                pill>
                {badge}
            </Badge>
        )
}