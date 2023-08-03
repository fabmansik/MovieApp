import {useContext} from "react";
import {ThemeContext} from "../containers/MoviesPageContainer";

export const UserInfoComponent = () => {
    const {theme} = useContext(ThemeContext)
    return(
        <div className={`account ${theme}`}>
            <img className='account-img' src='/accountImg.jpg' alt={'account img'}></img>
            <p>Welcome Milan</p>
        </div>
    )
}