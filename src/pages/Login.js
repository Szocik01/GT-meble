import SiteTextContainer from '../UI/SiteTextContainer';
import style from "./Login.module.css";
import LoginForm from '../components/LoginComponents/LoginForm';
import { useDispatch } from 'react-redux';
import {positionActions} from "../storage/redux";
import { useEffect } from 'react';

export default function Login()
{
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(positionActions.pagePositionChange(5));
    }, [dispatch]);



    return <SiteTextContainer>
        <h2 className={style.header}>Logowanie</h2>
        <LoginForm/>
    </SiteTextContainer>
}