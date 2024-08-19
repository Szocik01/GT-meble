import { useCallback, useEffect, useRef, useState } from "react";
import style from "./Service.module.css";
import ContentEditor from "../AdminUtilComponents/ContentEditor";
import useHttp from "../../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../../utils/Constants";
import { useDispatch } from "react-redux";
import { popUpInfoActions } from "../../../storage/redux";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ContentLoading from "../../../UI/ContentLoading";


export default function Service() {
  const [editData, setEditData] = useState(null);
  const [isEditorLoading, setEditorLoading] = useState(true);
  const [getData, isDataLoading] = useHttp(`${API_CALL_URL_BASE}/service`);
  const [saveData, isSaveLoading] = useHttp(
    `${API_CALL_URL_BASE}/service/${editData === null ? "add" : "edit"}`
  );

  const token = useSelector((state)=>{
    return state.loginData.token;
  });

  const dispatch = useDispatch();

  const editorRef = useRef(null);

  const handleGetDataResponse = useCallback(function (response) {
    if (!response.ok && response.status !== 404) {
      throw new Error("Błąd serwera. Nie można pobrać danych.");
    }

    if (response.status === 404) {
      return;
    }

    return response.json().then((data) => {
      setEditData(data);
    });
  }, []);

  const handleGetDataError = useCallback(
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

  const handleSaveDataResponse = useCallback(function (response) {
    if (!response.ok) {
      throw new Error(
        `Nie udało się ${editData === null ? "dodać" : "edytować"} opisu`
      );
    }
    return response.json().then((data) => {
      const content=editorRef.current?.getContent()
      setEditData((prevValue)=>{
        return (prevValue===null ? {id:data.id,content:content} : {...prevValue, content:content})
      })
      dispatch(popUpInfoActions.setMessage({
        isError: false,
        message: data.message,
        isVisible: true,
      }))
    });
  }, []);

  const handleSaveDataError = useCallback(function (error) {
    dispatch(
      popUpInfoActions.setMessage({
        isError: true,
        message: error.message,
        isVisible: true,
      })
    );
  }, []);

  function editorInitHandler() {
    setEditorLoading(false);
  }

  function resetEditorValueHandler() {
    editorRef.current.setContent(editData?.content);
  }

  function submitHandler(event) {
    event.preventDefault();
    const content = editorRef.current?.getContent();
    const bodyObject = {
      content: content
    }
    if(editData !==null){
      bodyObject.id = editData.id;
    }
    saveData(handleSaveDataResponse, handleSaveDataError, {
      method: editData === null ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(bodyObject)
    });
  }

  useEffect(() => {
    getData(handleGetDataResponse, handleGetDataError);
  }, [handleGetDataError, handleGetDataResponse, getData]);

  return (
    <>
    {isSaveLoading ? <ContentLoading coverParent={true}/> : ""}
    <form className={style.container} onSubmit={submitHandler}>
      <h1 className={style.title}>Edytuj opis usług</h1>
      <ContentEditor
        initialValue={editData?.content}
        isLoading={isEditorLoading || isDataLoading}
        onInit={editorInitHandler}
        ref={editorRef}
      />
      {!isEditorLoading && !isDataLoading ? (
        <div className={style.buttonsContainer}>
          <Button color="success" type="submit" variant="contained">
            zapisz
          </Button>
          <Button
            color="error"
            type="button"
            variant="contained"
            onClick={resetEditorValueHandler}
          >
            resetuj zmiany
          </Button>
        </div>
      ) : (
        ""
      )}
    </form>
    </>
  );
}
