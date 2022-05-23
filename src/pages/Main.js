import { Fragment, useEffect } from "react"
import style from "./Main.module.css";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import SiteTextContainer from "../UI/SiteTextContainer";

export default function Main()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(0))
    },[dispatch]);


    return <Fragment>
        <SiteTextContainer isObserving={true}>
            <h2 className={style.mainHeader}>Najlepsze ryby jakie możesz kupić!</h2>
            <p className={style.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sollicitudin imperdiet dolor, nec auctor mauris. In convallis, enim at iaculis tincidunt, nisl ligula efficitur lectus, nec feugiat risus dolor eget orci. Pellentesque tellus mi, congue id sagittis a, posuere vitae neque. Phasellus ut lacus commodo, interdum nibh a, iaculis justo. Phasellus id tincidunt mauris, ut lobortis elit. Proin sit amet rhoncus libero. In posuere non arcu ac varius. Suspendisse iaculis pulvinar sodales.</p>
        </SiteTextContainer>
    </Fragment>
}