import { Fragment,useEffect } from "react";
import style from "./Prices.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";

export default function Prices()
{
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(2))
    },[dispatch,positionActions]);

    return<Fragment></Fragment>
}