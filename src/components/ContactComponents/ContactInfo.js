import style from "./ContactInfo.module.css";


export default function ContactInfo(props)
{



    return <div className={`${style.container} ${props.gridClass}`}>
        <img alt={props.alt} src={props.src} className={style.image}/>
        {props.children}
    </div>
}