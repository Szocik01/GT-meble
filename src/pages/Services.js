import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { positionActions, popUpInfoActions } from "../storage/redux";
import ContentLoading from "../UI/ContentLoading";
import NoData from "../UI/NoData";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import parse from 'html-react-parser';
import SingleColumn from "../UI/Layouts/SingleColumn";

export default function Prices() {
  const [htmlText, setHtmlText] = useState("");
  const [sendRequest, isLoading] = useHttp(`${API_CALL_URL_BASE}/service`);

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
        })
      );
    },
    [dispatch]
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
          <SingleColumn title={"Sprawdź nasze usługi"} marginBottom={true}>
            {parse(htmlText)}
          </SingleColumn>
        </>
      )}
    </>
  );
}
