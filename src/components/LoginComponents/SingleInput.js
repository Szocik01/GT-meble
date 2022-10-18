import { useState } from "react";
import style from "./SingleInput.module.css";

export default function SingleInput(props) {
  const {
    name,
    title,
    type,
    inputValue,
    setValue,
    validationErrorInfo,
    setValidationErrorInfo,
    validationFunction,
  } = props;

  const [isInputFocused, setIsInputFocused] = useState(false);

  function moveLabelUp() {
    setIsInputFocused(true);
  }

  function moveLabelDown() {
    if (inputValue.trim().length === 0) {
      setIsInputFocused(false);
    }
  }

  function setValueHandler(event) {
    setValue(event.target.value);
  }

  function onFocusHandler() {
    moveLabelUp();
    setValidationErrorInfo("");
  }

  function onBlurHandler() {
    moveLabelDown();
    validationFunction();
  }

  return (
    <div className={style.container}>
      <label className={style.label}>
        <span
          className={`${style.text} ${isInputFocused ? style.transform : ""}`}
        >
          {title}
        </span>
        <input
          value={inputValue}
          type={type}
          name={name}
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
