import { Rating } from '@mui/material';
import {FC, PropsWithChildren} from "react";
import {OverridableStringUnion} from "@mui/types";
import {RatingPropsSizeOverrides} from "@mui/material/Rating/Rating";
interface IProps{
    vote_average: number
    size:OverridableStringUnion<'small' | 'medium' | 'large', RatingPropsSizeOverrides>
}
export const StarsRatingComponent:FC<PropsWithChildren<IProps>> = ({vote_average, size}) => {
    return(
                <Rating name="half-rating-read" precision={0.5} size={size} value={vote_average/2} readOnly/>
    )
}