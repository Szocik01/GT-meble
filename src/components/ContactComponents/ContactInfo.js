import style from "./ContactInfo.module.css";
import React from "react";

export default React.memo(function ContactInfo(props)
{



    return <div className={`${style.container} ${props.gridClass}`}>
        <img alt={props.alt} src={props.src} className={style.image}/>
        {props.children}
    </div>
});