import style from "./Login.module.css";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import SingleColumn from "../UI/Layouts/SingleColumn.js";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ContentLoading from "../UI/ContentLoading";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useDispatch } from "react-redux";
import setSingleCookie from "../utils/SetSingleCookie";
import { loginDataActions } from "../storage/redux";
import useHttp from "../hooks/useHttp";

export default function Login() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverErrorInfo, setServerErrorInfo] = useState("");
  const [canDisplayEmailError, setDisplayEmailError] = useState(false);
  const [canDisplayPasswordError, setDisplayPasswordError] = useState(false);
  const [sendRequest, isLoading] = useHttp(`${API_CALL_URL_BASE}/auth/login`);
  let passwordErrorInfo = "";
  let emailErrorInfo = "";

  const dispatch = useDispatch();

  function validateEmail(email) {
    if (email.trim().length === 0) {
      return "Proszę podać email.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      return "Proszę podać poprawny format maila.";
    }
    return "";
  }

  function validatePassword(password) {
    if (password.trim().length < 8) {
      return "Hasło powinno zawierać przynajmniej 8 znaków.";
    }
    return "";
  }

  function handleResponse(response) {
    if (response.status >= 400 && response.status < 500) {
      const error = new Error("Niepoprawny email lub hasło.");
      throw error;
    }
    if (response.status >= 500) {
      const error = new Error("Wewnętrzny błąd serwera.");
      throw error;
    }
    return response.json().then((data) => {
      setSingleCookie("token", data.token, 60);
      dispatch(loginDataActions.setTokenInRedux({ token: data.token }));
    });
  }

  function handleError(error) {
    setServerErrorInfo(error.message);
  }

  function handleClickShowPassword() {
    setPasswordVisible((prevValue) => {
      return !prevValue;
    });
  }

  function onEmailFocusHandler() {
    setDisplayEmailError(false);
  }

  function onPasswordFocusHandler() {
    setDisplayPasswordError(false);
  }

  function onEmailBlurHandler() {
    setDisplayEmailError(true);
  }

  function onPasswordBlurHandler() {
    setDisplayPasswordError(true);
  }

  function onEmailChangeHandler(event) {
    setEmail(event.target.value);
  }

  function onPasswordChangeHandler(event) {
    setPassword(event.target.value);
  }

  emailErrorInfo = validateEmail(email);
  passwordErrorInfo = validatePassword(password);

  function onSubmitHandler(event) {
    event.preventDefault();
    setServerErrorInfo("");
    if (emailErrorInfo || passwordErrorInfo) {
      setDisplayEmailError(true);
      setDisplayPasswordError(true);
      return;
    }
    sendRequest(handleResponse, handleError, {
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <SingleColumn>
      <div className={style.container}>
        <form className={style.form} onSubmit={onSubmitHandler}>
          <h1 className={style.header}>Logowanie</h1>
          <TextField
            name="email"
            type="email"
            label="E-mail"
            fullWidth
            helperText={
              canDisplayEmailError && emailErrorInfo !== ""
                ? emailErrorInfo
                : " "
            }
            error={canDisplayEmailError && !!emailErrorInfo}
            onBlur={onEmailBlurHandler}
            onFocus={onEmailFocusHandler}
            onChange={onEmailChangeHandler}
            value={email}
          />
          <FormControl
            fullWidth
            variant="outlined"
            error={canDisplayPasswordError && !!passwordErrorInfo}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              onBlur={onPasswordBlurHandler}
              onFocus={onPasswordFocusHandler}
              onChange={onPasswordChangeHandler}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="password"
            />
            <FormHelperText>
              {canDisplayPasswordError && passwordErrorInfo !== ""
                ? passwordErrorInfo
                : " "}
            </FormHelperText>
          </FormControl>
          <FormHelperText error={!!serverErrorInfo}>
            {serverErrorInfo !== "" ? serverErrorInfo : " "}
          </FormHelperText>
          <Button type="submit" variant="contained" size="large" disabled={!!emailErrorInfo || !!passwordErrorInfo}>
            Zaloguj
          </Button>
          {isLoading && <ContentLoading coverParent={true} />}
        </form>
      </div>
    </SingleColumn>
  );
}
