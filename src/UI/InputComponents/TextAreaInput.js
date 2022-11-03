import { useState, useEffect, useCallback } from "react";
import style from "./TextAreaInput.module.css";

export default function TextAreaInput(props) {
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

  const moveLabelDown = useCallback(() => {
    if (!(inputValue.trim().length > 0)) {
      setIsLabelUp(false);
    }
  },[inputValue]);

  function moveLabelUp() {
    setIsLabelUp(true);
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

  useEffect(() => {
    if (inputValue.trim() !== "") {
      moveLabelUp();
    } else {
      moveLabelDown();
    }
  }, [inputValue,moveLabelDown]);

  return (
    <div className={style.container}>
      <label className={style.label}>
        <span className={`${style.text} ${isLabelUp ? style.transform : ""}`}>
          {title}
        </span>
        <textarea
          className={`${style.textarea} ${
            validationErrorInfo ? style.error : ""
          }`}
          value={inputValue}
          {...inputOptions}
          onChange={setValueHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        ></textarea>
      </label>
      <span className={style.errorInfo}>{validationErrorInfo}</span>
    </div>
  );
}
