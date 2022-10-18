import { Fragment, useState } from "react";
import style from "./LoginForm.module.css";
import SingleInput from "./SingleInput";
import { useDispatch } from "react-redux";
import { loginDataActions } from "../../storage/redux";
import setSingleCookie from "../../utils/SetSingleCookie";
import { Button, CircularProgress } from "@mui/material";
import Backdrop from "../../UI/Backdrop";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailErrorInfo, setEmailErrorInfo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorInfo, setPasswordErrorInfo] = useState("");
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);
  const [serverErrorInfo, setServerErrorInfo] = useState("");

  const navigator = useNavigate();

  const dispatch = useDispatch();

  function emailValidation() {
    if (email.trim().length === 0) {
      setEmailErrorInfo("Proszę podać email.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setEmailErrorInfo("Proszę podać poprawny format maila.");
      return false;
    }
    return true;
  }

  function passwordValidation() {
    if (password.trim().length < 8) {
      setPasswordErrorInfo("Hasło powinno zawierać przynajmniej 8 znaków.");
      return false;
    }
    return true;
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    setIsSpinnerActive(true);
    setServerErrorInfo("");
    const isEmailValid = emailValidation();
    const isPasswordValid = passwordValidation();
    if (!isEmailValid || !isPasswordValid) {
      setIsSpinnerActive(false);
      return;
    }
    fetch("http://localhost:8080/auth/login", {
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 500) {
          const error = new Error("Niepoprawny email lub hasło.");
          error.statusCode = response.status;
          throw error;
        }
        if (response.status >= 500) {
          const error = new Error("Wewnętrzny błąd serwera.");
          error.statusCode = response.status;
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        dispatch(loginDataActions.setTokenInRedux({ token: data.token }));
        setSingleCookie("token", data.token, 60);
        navigator("/");
      })
      .catch((error) => {
        setServerErrorInfo(error.message);
        setIsSpinnerActive(false);
      })
  }

  return (
    <Fragment>
      <form className={style.form} onSubmit={onSubmitHandler}>
        <SingleInput
          type="text"
          name="email"
          title="E-mail"
          inputValue={email}
          setValue={setEmail}
          validationErrorInfo={emailErrorInfo}
          setValidationErrorInfo={setEmailErrorInfo}
          validationFunction={emailValidation}
        />
        <SingleInput
          type="password"
          name="password"
          title="Hasło"
          inputValue={password}
          setValue={setPassword}
          validationErrorInfo={passwordErrorInfo}
          setValidationErrorInfo={setPasswordErrorInfo}
          validationFunction={passwordValidation}
        />
        {serverErrorInfo ? <div className={style.serverErrorInfo}>{serverErrorInfo}</div>:""}
        <Button type="submit" color="success" variant="contained" size="large">
          Zaloguj
        </Button>
      </form>
      <Backdrop isForNavigation={false} isUnfolded={isSpinnerActive} zIndex={15}>
        <CircularProgress sx={{ color: "white" }} /> 
      </Backdrop>
    </Fragment>
  );
}
