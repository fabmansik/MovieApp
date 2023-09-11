import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";

const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<AppDispatch>()

export {
    useAppDispatch, useAppSelector
}