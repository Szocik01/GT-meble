import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import SiteTextContainer from "../UI/SiteTextContainer";
import SingleProduct from "../components/ProductsComponents/SingleProduct";
import style from "./Products.module.css";
import dorszImg from "../images/dorsz.jpg";
import karpImg from "../images/karp.jpg";
import lososImg from "../images/losos.jpg";
import karasImg from "../images/karas.jpg"

export default function Products()
{
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(1))
    },[dispatch]);

    return <Fragment>  
    <SiteTextContainer isObserving={false}>
        <h3 className={style.header}>POZNAJ NASZĄ OFERTĘ</h3>
        <SingleProduct alt="Karp image" title="Karp" image={karpImg}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada dui ac ipsum finibus, sed blandit ex convallis. Donec consequat posuere nisi, at ultrices erat pretium quis. Donec dolor nibh, vulputate non condimentum id, feugiat sed felis. Aenean condimentum porttitor purus, ultricies sodales lorem venenatis vitae. Curabitur tempor placerat leo, elementum tincidunt erat laoreet eu. Praesent imperdiet lobortis velit ac imperdiet. Maecenas commodo, dui vel gravida dapibus, sapien nisi imperdiet libero, vel molestie enim est in arcu.</SingleProduct>
        <SingleProduct alt="Dorsz image" title="Dorsz" image={dorszImg}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada dui ac ipsum finibus, sed blandit ex convallis. Donec consequat posuere nisi, at ultrices erat pretium quis. Donec dolor nibh, vulputate non condimentum id, feugiat sed felis. Aenean condimentum porttitor purus, ultricies sodales lorem venenatis vitae. Curabitur tempor placerat leo, elementum tincidunt erat laoreet eu. Praesent imperdiet lobortis velit ac imperdiet. Maecenas commodo, dui vel gravida dapibus, sapien nisi imperdiet libero, vel molestie enim est in arcu.</SingleProduct>
        <SingleProduct alt="Karaś image" title="Karaś" image={karasImg}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada dui ac ipsum finibus, sed blandit ex convallis. Donec consequat posuere nisi, at ultrices erat pretium quis. Donec dolor nibh, vulputate non condimentum id, feugiat sed felis. Aenean condimentum porttitor purus, ultricies sodales lorem venenatis vitae. Curabitur tempor placerat leo, elementum tincidunt erat laoreet eu. Praesent imperdiet lobortis velit ac imperdiet. Maecenas commodo, dui vel gravida dapibus, sapien nisi imperdiet libero, vel molestie enim est in arcu.</SingleProduct>
        <SingleProduct alt="Łosoś image" title="Łosoś" image={lososImg}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada dui ac ipsum finibus, sed blandit ex convallis. Donec consequat posuere nisi, at ultrices erat pretium quis. Donec dolor nibh, vulputate non condimentum id, feugiat sed felis. Aenean condimentum porttitor purus, ultricies sodales lorem venenatis vitae. Curabitur tempor placerat leo, elementum tincidunt erat laoreet eu. Praesent imperdiet lobortis velit ac imperdiet. Maecenas commodo, dui vel gravida dapibus, sapien nisi imperdiet libero, vel molestie enim est in arcu.</SingleProduct>
    </SiteTextContainer></Fragment>
}