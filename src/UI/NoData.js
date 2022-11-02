import style from "./NoData.module.css";

export default function NoData(props) {

  return (
    <div className={style.container}>
      <span className={style.text}>{props.children}</span>
    </div>
  );
}
