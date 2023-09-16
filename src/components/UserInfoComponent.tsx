import {useAppSelector} from "../Hooks/reduxHooks";

export const UserInfoComponent = () => {
    const {lng, theme, smallerThan750} = useAppSelector(state => state.params)

    const welcomeText={
        en:'Welcome Milan',
        uk:'Вітаю Мілан'
    }
    return(
        <div className={`account ${theme}`}>
            <img className='account-img' src='/accountImg.jpg' alt={'account img'}></img>
            {smallerThan750&&<p>{lng==='uk'?welcomeText.uk:welcomeText.en}</p>}
        </div>
    )
}