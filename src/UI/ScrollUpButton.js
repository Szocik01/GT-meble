import style from "./ScrollUpButton.module.css";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import ScrollUpSvg from "../Svgs/ScrollUp.svg";

export default function ScrollUpButton()
{

    const buttonRef=useRef();

    const isScrolled = useSelector((state) => {
        return state.navigationColor.isScrolled;
      });

      useEffect(()=>{
          if(buttonRef.current)
          {
            let timer;
            if(isScrolled)
            {
              buttonRef.current.classList.add(style.display);
              timer=setTimeout(() => {
                  buttonRef.current.classList.add(style.show); 
              },20);
            }
            else
            {
              buttonRef.current.classList.remove(style.show);
              timer=setTimeout(()=>{
                  buttonRef.current.classList.remove(style.display);
              },410);
            }
            return () => clearTimeout(timer);
          }
      },[buttonRef,isScrolled]);

      function scrollToTop()
      {
        window.scrollTo(0,0)
      }



    return <button type="button" className={style.button} onClick={scrollToTop} ref={buttonRef}><img alt="ScrollUp" src={ScrollUpSvg}/></button>;
}