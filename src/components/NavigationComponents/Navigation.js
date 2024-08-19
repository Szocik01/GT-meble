import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Backdrop from "../../UI/Backdrop";
import { loginDataActions } from "../../storage/redux";
import { useDispatch } from "react-redux";
import deleteSingleCookie  from "../../utils/DeleteSingleCookie";
import {Outlet, useNavigate} from "react-router-dom";
import style from './Navigation.module.css';

export default function Navigation()
{
    const [isUnfolded,setIsUnfolded]=useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    function logoutHandler()
    {
        deleteSingleCookie("token");
        dispatch(loginDataActions.deleteTokenFromRedux());
        navigator("/");
    }

    return <Fragment>
        <Navbar setIsUnfolded={setIsUnfolded} isUnfolded={isUnfolded}/>
        <Sidebar isUnfolded={isUnfolded}/>
        <Backdrop isForNavigation={true} isUnfolded={isUnfolded} setIsVisible={setIsUnfolded}/>
        <div className={style.underNavigationFiller}></div>
        <Outlet/>
    </Fragment>
}