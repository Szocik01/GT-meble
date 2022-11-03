import { useEffect, useState } from "react";
import style from "./SingleInput.module.css";

export default function SingleInput(props) {
  const {
    inputOptions,
    title,
    inputValue,
    setValue,
    validationErrorInfo,
    setValidationErrorInfo,
    validationFunction,
  } = props;

  const [isLabelUp, setIsLabelUp] = useState(false);

  function moveLabelUp() {
    setIsLabelUp(true);
  }

  function moveLabelDown() {
    if (inputOptions.type !== "number" && inputValue.trim().length === 0) {
      setIsLabelUp(false);
    } else if (inputValue.length === 0) {
      setIsLabelUp(false);
    }
  }

  function setValueHandler(event) {
    setValue(event.target.value);
  }

  function onFocusHandler() {
    moveLabelUp();
    setValidationErrorInfo("");
  }

  function onBlurHandler(event) {
    if (
      inputOptions.type === "number" &&
      !isNaN(parseFloat(event.target.value))
    ) {
      setValue(parseFloat(event.target.value).toFixed(2));
    }
    moveLabelDown();
    validationFunction();
  }

  useEffect(() => {
    if (
      (inputOptions.type === "number" && inputValue !== "") ||
      inputValue.trim() !== ""
    ) {
      moveLabelUp();
    } else {
      moveLabelDown();
    }
  }, [inputValue]);

  return (
    <div className={style.container}>
      <label className={style.label}>
        <span className={`${style.text} ${isLabelUp ? style.transform : ""}`}>
          {title}
        </span>
        <input
          {...inputOptions}
          value={inputValue}
          className={`${style.input} ${validationErrorInfo ? style.error : ""}`}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={setValueHandler}
        />
      </label>
      <span className={style.errorInfo}>{validationErrorInfo}</span>
    </div>
  );
}
