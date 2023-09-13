import {useAppSelector} from "../Hooks/reduxHooks";

export const UserInfoComponent = () => {
    const theme = useAppSelector(state => state.params.theme)
    return(
        <div className={`account ${theme}`}>
            <img className='account-img' src='/accountImg.jpg' alt={'account img'}></img>
            <p>Welcome Milan</p>
        </div>
    )
}