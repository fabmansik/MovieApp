import {Badge} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {FC, PropsWithChildren, useState} from "react";
import {useAppSelector} from "../../Hooks/reduxHooks";
import {Link} from "react-router-dom";
import {IGenre} from "../../interfaces/moviesInterfaces";

interface IProps {
    badge: IGenre
}

export const GenreBadgeComponent: FC<PropsWithChildren<IProps>> = ({badge}) => {
    const {theme, lng} = useAppSelector(state => state.params)
    const [hoverColor, setHoverColor] = useState(false)
    return (
        <Link to={`/?language=${lng}&with_genres=${badge.id}`} className={'genre-link'}>
            <Badge
                color={theme === "light" ? (hoverColor ? 'dark' : 'secondary') : (!hoverColor ? 'dark' : 'secondary')}
                onMouseEnter={() => {
                    setHoverColor(true)
                }}
                onMouseLeave={() => {
                    setHoverColor(false)
                }}
                className='badge'
                // onClick={() => navigate(`/?language=${lng}&with_genres=${badge.id}`)}
                pill
                onMOu>
                {badge.name}
            </Badge>
        </Link>
    )
}