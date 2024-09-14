import { useState, useRef } from "react";
import useHttp from "../../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { popUpInfoActions } from "../../../storage/redux";
import { useNavigate } from "react-router-dom";
import AddRealizationForm from "../RealizationsComponents/AddRealizationForm";

export default function AddRealization() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [inputCategory, setInputCategory] = useState("");
  const [images, setImages] = useState([]);

  const contentEditorRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => {
    return state.loginData.token;
  });

  const [sendAddRealizationRequest, isAddRealizationLoading] = useHttp(
    `${API_CALL_URL_BASE}api/post/add`
  );

  function addRealizationResponseHandler(response) {
    if (!response.ok) {
      throw new Error("Nie udało się dodać realizacji");
    }
    return response.json().then((data) => {
      dispatch(
        popUpInfoActions.setMessage({
          isError: false,
          message: "Realizacja została dodana",
          isVisible: true,
        })
      );
      navigate("/admin/realizations");
    });
  }

  function addRealizationErrorHandler(error) {
    dispatch(
      popUpInfoActions.setMessage({
        isError: true,
        message: error.message,
        isVisible: true,
      })
    );
  }

  function submitFormHandler() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", inputCategory);
    formData.append("description", contentEditorRef.current.getContent());
    for (const image of images) {
      formData.append("images", image);
    }

    sendAddRealizationRequest(
      addRealizationResponseHandler,
      addRealizationErrorHandler,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );
  }

  return (
    <AddRealizationForm
      isLoading={isAddRealizationLoading}
      title={title}
      inputCategory={inputCategory}
      category={category}
      newImages={images}
      onFormSubmit={submitFormHandler}
      onTitleChange={(title) => setTitle(title)}
      onCategoryChange={(category) => setCategory(category)}
      onInputCategoryChange={(inputCategory) => setInputCategory(inputCategory)}
      onAddNewImages={(images) =>
        setImages((prevState) => [...prevState, ...images])
      }
      onRemoveNewImages={(index) =>
        setImages((prevState) => {
          const newState = [...prevState];
          newState.splice(index, 1);
          return newState;
        })
      }
      contentEditorRef={contentEditorRef}
    />
  );
}
