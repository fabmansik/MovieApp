import {Badge} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FC, PropsWithChildren, useContext} from "react";
import {useAppSelector} from "../../Hooks/reduxHooks";
interface IProps{
    badge:string
}
export const GenreBadgeComponent:FC<PropsWithChildren<IProps>> = ({badge}) => {
    const theme = useAppSelector(state => state.params.theme)
    return(
        <Badge color={theme === "light"? 'secondary' : 'dark'} className='badge' pill>
            {badge}
        </Badge>
    )
}