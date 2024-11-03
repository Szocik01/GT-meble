import Button from "@mui/material/Button";
import ContentLoading from "../../../UI/ContentLoading";
import ImageWithAdminOptions from "../AdminUtilComponents/ImageWithAdminOptions";
import ContentEditor from "../AdminUtilComponents/ContentEditor";
import ImageUploadInput from "../../../UI/InputComponents/ImageUploadInput";
import { Autocomplete, TextField } from "@mui/material";
import style from "./AddRealizationForm.module.css";
import { useState, useEffect } from "react";
import useHttp from "../../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../../utils/Constants";

function validateTitle(title) {
  if (title.length < 4) {
    return "Tytuł musi mieć co najmniej 4 znaki.";
  }
  return null;
}

function validateCategory(category) {
  if (!category || category.length === 0) {
    return "Kategoria nie może być pusta.";
  }
  return null;
}

function validateImages(image) {
  if (image.type !== "image/jpeg" && image.type !== "image/png") {
    return `Plik ${image.name} musi być w formacie JPG lub PNG`;
  }
  if (image.size > 2 * 1024 * 1024) {
    return `Zdjęcie ${image.name} nie może być większe niż 2MB`;
  }
  return null;
}

export default function AddRealizationForm(props) {
  const {
    isLoading,
    title,
    inputCategory,
    category,
    newImages,
    oldImages,
    onFormSubmit,
    onTitleChange,
    onCategoryChange,
    onInputCategoryChange,
    onAddNewImages,
    onRemoveNewImages,
    onRemoveOldImages,
    contentEditorRef,
    editorInitialValue,
  } = props;

  const [imagesErrors, setImagesErrors] = useState([]);
  const [canShowTitleError, setCanShowTitleError] = useState(false);
  const [canShowCategoryError, setCanShowCategoryError] = useState(false);
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);

  const titleError = validateTitle(title);
  const categoryError = validateCategory(inputCategory);

  const [sendCategoriesRequest] = useHttp(
    `${API_CALL_URL_BASE}api/posts/categories`
  );

  function getCategoriesResponseHandler(response) {
    if (!response.ok) {
      throw new Error("Nie udało się pobrać kategorii");
    }
    return response.json().then((data) => {
      setAllCategories(data.categories);
    });
  }

  function getCategoriesErrorHandler(error) {
    console.error(error.message);
  }

  useEffect(() => {
    sendCategoriesRequest(
      getCategoriesResponseHandler,
      getCategoriesErrorHandler
    );
  }, [sendCategoriesRequest]);


  return (
    <form
      className={style.container}
      onSubmit={(event) => {
        event.preventDefault();
        if (
          !!titleError ||
          !!categoryError ||
          (oldImages && oldImages.length === 0 && newImages && newImages.length === 0) ||
          (!oldImages && newImages && newImages.length === 0)
        ) {
          return;
        }
        onFormSubmit();
      }}
    >
      {isLoading && <ContentLoading coverParent={true} />}
      <h1 className={style.title}>Dodaj realizację</h1>
      <Button
        sx={{ alignSelf: "flex-end" }}
        color="success"
        type="submit"
        variant="contained"
        disabled={
          !!titleError ||
          !!categoryError ||
          (oldImages && oldImages.length === 0 && newImages && newImages.length === 0) ||
          (!oldImages && newImages && newImages.length === 0)
        }
      >
        zapisz
      </Button>
      <div className={style.formGroup}>
        <TextField
          variant="outlined"
          label="Tytuł"
          onChange={(event) => {
            onTitleChange(event.target.value);
          }}
          fullWidth={true}
          value={title}
          onFocus={() => {
            setCanShowTitleError(false);
          }}
          onBlur={() => {
            setCanShowTitleError(true);
          }}
          error={canShowTitleError && titleError !== null}
          helperText={canShowTitleError && titleError ? titleError : " "}
        />
      </div>
      <div className={style.formGroup}>
        <Autocomplete
          id="categories-autocomplete"
          freeSolo
          options={allCategories}
          value={category}
          inputValue={inputCategory}
          onInputChange={(event, newInputValue) => {
            onInputCategoryChange(newInputValue);
          }}
          onChange={(event, newValue) => {
            onCategoryChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              onFocus={() => {
                setCanShowCategoryError(false);
              }}
              onBlur={() => {
                setCanShowCategoryError(true);
              }}
              {...params}
              label="Kategorie"
              error={canShowCategoryError && categoryError !== null}
              helperText={
                canShowCategoryError && categoryError ? categoryError : " "
              }
            />
          )}
        />
      </div>
      <div className={style.formGroup}>
        <ContentEditor
          initialValue={editorInitialValue || ""}
          ref={contentEditorRef}
          isLoading={isEditorLoading}
          onInit={() => {
            setIsEditorLoading(false);
          }}
        />
      </div>
      <ImageUploadInput
        dropzoneText="Dodaj zdjęcia"
        onUploadImages={(files) => {
          const imagesToUpload = [];
          const imagesErrors = [];
          for (const file of files) {
            const imageError = validateImages(file);
            if (imageError) {
              imagesErrors.push(imageError);
            } else {
              imagesToUpload.push(file);
            }
          }
          setImagesErrors(imagesErrors);
          onAddNewImages(imagesToUpload);
        }}
      />
      {imagesErrors.length > 0 && (
        <div className={style.imagesErrors}>
          {imagesErrors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      <div className={style.imagesGroup}>
        {oldImages &&
          oldImages.map((image, index) => (
            <ImageWithAdminOptions
              key={`old-${index}`}
              url={`${API_CALL_URL_BASE}${image.path}`}
              onDeleteImage={() => {
                onRemoveOldImages(image, index);
              }}
              alt={image}
            />
          ))}
        {newImages &&
          newImages.map((image, index) => (
            <ImageWithAdminOptions
              key={`new-${index}`}
              url={URL.createObjectURL(image)}
              onDeleteImage={() => {
                onRemoveNewImages(index);
              }}
              alt={image.name}
            />
          ))}
      </div>
    </form>
  );
}
