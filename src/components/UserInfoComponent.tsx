import {useAppSelector} from "../Hooks/reduxHooks";

export const UserInfoComponent = () => {
    const {language, theme} = useAppSelector(state => state.params)
    const welcomeText={
        en:'Welcome Milan',
        uk:'Вітаю Мілан'
    }
    return(
        <div className={`account ${theme}`}>
            <img className='account-img' src='/accountImg.jpg' alt={'account img'}></img>
            <p>{language==='uk'?welcomeText.uk:welcomeText.en}</p>
        </div>
    )
}