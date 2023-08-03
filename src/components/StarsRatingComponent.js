import { Rating } from '@mui/material';
export const StarsRatingComponent = ({vote_average, size}) => {
    return(
                <Rating name="half-rating-read" precision={0.5} size={size} value={vote_average/2} readOnly/>
    )
}