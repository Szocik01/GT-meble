import style from "./SingleColumn.module.css";

export default function SingleColumn(props) {
  const htmlOptions = props.htmlOptions || {};
  const title = props.title;
  const withoutMinHeight = props.withoutMinHeight;
  const marginBottom = props.marginBottom;
  const marginTop = props.marginTop;

  return (
    <main
      className={`${style.container} ${
        !withoutMinHeight ? style.minHeight : ""
      } ${marginBottom ? style.marginBottom : ""} ${
        marginTop ? style.marginTop : ""
      }`}
      {...htmlOptions}
    >
      {!!title && <h1 className={style.header}>{title}</h1>}
      {props.children}
    </main>
  );
}
