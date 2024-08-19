import style from "./TwoColumns.module.css";
import SingleColumn from "./SingleColumn";

export default function TwoColumns(props) {
  const htmlOptions = props.htmlOptions || {};
  const sideElement = props.sideElement || null;
  const title = props.title;
  const withoutMinHeight = props.withoutMinHeight;
  const marginBottom = props.marginBottom;
  const marginTop = props.marginTop;

  return (
    <SingleColumn
      htmlOptions={htmlOptions}
      title={title}
      marginBottom={marginBottom}
      marginTop={marginTop}
      withoutMinHeight={withoutMinHeight}
    >
      <div className={style.row}>
        <div className={style.main}>{props.children}</div>
        <aside className={style.side}>{sideElement}</aside>
      </div>
    </SingleColumn>
  );
}
