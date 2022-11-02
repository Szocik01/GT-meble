import { Fragment,useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import style from "./About.module.css";
import SiteTextContainer from "../UI/SiteTextContainer";
import stockGuyImg from "../images/stockGuy.webp";

export default function About()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(3))
    },[dispatch]);

    return<Fragment>
        <SiteTextContainer>
            <h2 className={style.header}>POZNAJ NAS</h2>
            <div className={style.imageContainer}>
                <img alt="Random stock guy" src={stockGuyImg}/>
            </div>
            <p className={style.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque erat vitae nisi tempus vulputate. Donec ultricies velit ut volutpat porta. Donec lorem nibh, rhoncus eu lacus sit amet, hendrerit varius leo. Cras ac pellentesque lectus. Nulla ut mauris a turpis euismod malesuada. Curabitur cursus felis a commodo aliquet. Mauris sit amet elit commodo, consectetur ex eu, congue lacus. Etiam volutpat mi urna, sed porta leo vehicula sit amet. Ut ut ullamcorper purus. Nam ac velit pellentesque, feugiat nibh id, lacinia mauris. Quisque varius enim varius vulputate malesuada. Curabitur at nunc bibendum lectus faucibus semper. Cras in commodo lorem. Nunc eget sem nec nisi feugiat iaculis.</p>
            <p className={style.text}>Fusce eu felis eget nulla interdum eleifend at sit amet eros. Nunc fringilla diam odio, semper convallis nisi pretium id. Proin varius ligula pellentesque, varius arcu sit amet, pulvinar nulla. Quisque ex turpis, sodales ut neque eget, fermentum tristique leo. Quisque et nibh nec quam sodales sollicitudin eu condimentum quam. Sed imperdiet ligula leo, ac feugiat nisi consequat et. Morbi blandit interdum odio, quis fermentum metus sodales at.</p>
        </SiteTextContainer>
    </Fragment>
}