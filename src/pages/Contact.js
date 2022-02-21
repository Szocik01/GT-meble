import { Fragment, useEffect } from "react";
import style from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";

export default function Contact()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(4));
    },[dispatch,positionActions]);


    return <Fragment></Fragment>
}