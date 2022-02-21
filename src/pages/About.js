import { Fragment,useEffect } from "react";
import style from "./About.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";

export default function About()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(3))
    },[dispatch,positionActions]);

    return<Fragment></Fragment>
}