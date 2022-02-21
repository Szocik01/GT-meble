import { Fragment, useEffect } from "react"
import style from "./Main.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";

export default function Main()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(0))
    },[dispatch,positionActions]);


    return <Fragment></Fragment>
}