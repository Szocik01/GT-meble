import style from "./Backdrop.module.css";
import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Backdrop(props)
{
    const backdropRef = useRef();
    const {isUnfolded, isMenu, setIsVisible}=props;

    function hideBackdrop()
    {
        setIsVisible(false);
    }

    useEffect(()=>{
        let timer;
        if(isUnfolded)
        {
            backdropRef.current.classList.add(`${style.display}`);
            timer=setTimeout(()=>{
                backdropRef.current.classList.add(`${style.visible}`);
            },20);
        }
        else
        {
            backdropRef.current.classList.remove(`${style.visible}`);
            timer=setTimeout(()=>{
                backdropRef.current.classList.remove(`${style.display}`);
            },210);
        }
        return ()=>{
            clearTimeout(timer);
        }
    },[isUnfolded]);

    return ReactDOM.createPortal(<div className={`${style.backdrop} ${ isMenu ? style.menu : ""}`} onClick={hideBackdrop} ref={backdropRef}></div>,document.getElementById("backdrop")); 
}