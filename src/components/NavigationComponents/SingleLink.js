import { Link } from "react-router-dom";
import style from "./SingleLink.module.css";


export default function SingleLink(props)
{
    
    function onMouseEnterHandler()
    {
        props.hoverPositionChangeHandler(props.id);
    }

    return <Link className={`${style.link} ${props.isActive ? style.active : ""}`} to={props.to} onMouseEnter={onMouseEnterHandler}>{props.linkName}</Link>
}