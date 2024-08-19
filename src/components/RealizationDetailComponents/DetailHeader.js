import style from "./DetailHeader.module.css";

export default function DetailHeader(props) {
  const { title, subtitle } = props;

  return (
    <div className={style.container}>
      <h1 className={style.header}>{title}</h1>
      <span className={style.subtitle}>{subtitle}</span>
    </div>
  );
}
