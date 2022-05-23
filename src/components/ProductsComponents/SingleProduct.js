import { Fragment } from "react";
import style from "./SingleProduct.module.css";

export default function SingleProduct(props) {
  return (
    <Fragment>
      <h3 className={`${style.itemsHeader} ${style.show}`}>{props.title}</h3>
      <div className={`${style.imageContainer} ${style.show}`}>
        <img alt={props.alt} src={props.image}/>
      </div>
      <p className={`${style.text} ${style.show}`}>
        {props.children}
      </p>
    </Fragment>
  );
}
