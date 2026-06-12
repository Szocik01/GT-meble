import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { positionActions, popUpInfoActions } from "../storage/redux";
import ContentLoading from "../UI/ContentLoading";
import NoData from "../UI/NoData";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import parse from "html-react-parser";
import SingleColumn from "../UI/Layouts/SingleColumn";
import { Link } from "react-router-dom";
import styles from "./Services.module.css";
import { Button } from "@mui/material";

export default function Prices() {
  const [htmlText, setHtmlText] = useState("");
  const [sendRequest, isLoading] = useHttp(`${API_CALL_URL_BASE}api/service`);

  const dispatch = useDispatch();

  const handleResponse = useCallback(function (response) {
    if (!response.ok) {
      throw new Error("Błąd serwera. Nie można pobrać danych");
    }
    return response.json().then((data) => {
      setHtmlText(data.content);
    });
  }, []);

  const handleError = useCallback(
    function (error) {
      dispatch(
        popUpInfoActions.setMessage({
          isError: true,
          message: error.message,
          isVisible: true,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(3));
  }, [dispatch]);

  useEffect(() => {
    sendRequest(handleResponse, handleError);
  }, [sendRequest, handleResponse, handleError]);

  return (
    <>
      {isLoading ? (
        <ContentLoading />
      ) : !htmlText ? (
        <NoData>Nie znaleziono opisu usług.</NoData>
      ) : (
        <>
          <SingleColumn 
          title={"Sprawdź nasze usługi"} 
          marginBottom={true}
          >
            <div className={styles.contentContainer}>
              {parse(htmlText)}
            </div>
            <div className={styles.contactContainer}>
              <h3 className={styles.contactTitle}>Potrzebujesz więcej informacji?</h3>
              <p className={styles.contactText}>Skontaktuj się z nami, a chętnie odpowiemy na wszystkie Twoje pytania.</p>
              <Link to="/contact">
                <Button variant="contained"
                sx={{
                    borderRadius: "8px",
                    color: "var(--color-primary)",
                    backgroundColor: "white",
                    ":hover":{
                        backgroundColor: "white",
                    }
                }}>
                    Skontaktuj się z nami!</Button>
              </Link>
            </div>
          </SingleColumn>
        </>
      )}
    </>
  );
}
