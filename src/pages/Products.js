import { Fragment, useEffect } from "react";
import style from "./Products.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";

export default function Products()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(1))
    },[dispatch,positionActions]);

    return <Fragment></Fragment>
}