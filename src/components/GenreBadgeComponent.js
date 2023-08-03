import {Badge} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useContext} from "react";
import {ThemeContext} from "../containers/MoviesPageContainer";
export const GenreBadgeComponent = ({badge}) => {
    const theme = useContext(ThemeContext)
    return(
            <Badge color={theme.theme === "light"? 'secondary' : 'dark'} className='badge' pill>
                {badge}
            </Badge>
        )
}