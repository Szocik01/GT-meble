import { useEffect, useRef } from "react";
import style from "./SiteTextContainer.module.css";
import sectionStyles from "../pages/Main.module.css";

export default function SiteTextContainer(props)
{
    const containerRef=useRef();

    const {isObserving}= props;

    useEffect(()=>{
        const observer=new IntersectionObserver((entries,observer)=>{
            if(isObserving)
            {
                entries.forEach((entry) => {
                    if(!entry.isIntersecting)
                    {
                        return;
                    }
                    entry.target.classList.add(`${sectionStyles.show}`);
                    observer.unobserve(entry.target);
                });
            }
        },{root:null,threshold:0.3,rootMargin:"0px 1500px"});
        
        for(const child of containerRef.current.children)
        {
            observer.observe(child);
        }
        
    },[containerRef,isObserving]);

    return <div className={style.container} ref={containerRef}>{props.children}</div>
}