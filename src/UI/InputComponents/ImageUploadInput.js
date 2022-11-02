import style from "./ImageUploadInput.module.css";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function ImageUploadInput(props) {
  const {
    name,
    text,
    setValue,
    inputValue,
    validationFunction,
    validationErrorInfo,
    setValidationErrorInfo,
    editImageUrl,
    setEditImageUrl
  } = props;

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  function dragoverImageHandler(event) {
    event.preventDefault();
    event.currentTarget.classList.add(style.draggedOver);
  }

  function dragLeaveImageHandler(event) {
    if (
      !(
        event.target.tagName === "svg" ||
        event.target.tagName === "path" ||
        event.target.tagName === "SPAN"
      )
    ) {
      event.currentTarget.classList.remove(style.draggedOver);
    }
  }

  function dropImageHandler(event) {
    event.preventDefault();
    event.currentTarget.classList.remove(style.draggedOver);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const isValid = validationFunction(files[0]);
      if (isValid) {
        setValidationErrorInfo("");
        setValue(files[0]);
      }
    }
  }

  function setImageFileHandler(event) {
    if (event.target.files) {
      const isValid = validationFunction(event.target.files[0]);
      if (isValid) {
        setValidationErrorInfo("");
        setValue(event.target.files[0]);
      }
    }
  }

  function deleteImageHandler()
  {
    setValue(null);
    setEditImageUrl("");
  }

  useEffect(() => {
    if (inputValue) {
      const previewUrl = URL.createObjectURL(inputValue);
      setImagePreviewUrl(previewUrl);
    } else {
      setImagePreviewUrl("");
    }
  }, [inputValue]);

  return !(imagePreviewUrl || editImageUrl)? (
    <label className={style.container}>
      <div
        className={style.imageUpload}
        onDragOver={dragoverImageHandler}
        onDrop={dropImageHandler}
        onDragLeave={dragLeaveImageHandler}
      >
        <ImageIcon
          sx={{ width: "40%", height: "40%" }}
          className={style.icon}
        />
        <span className={style.text}>{text}</span>
        <input
          type="file"
          name={name}
          className={style.input}
          onChange={setImageFileHandler}
        />
      </div>
      <span className={style.errorInfo}>{validationErrorInfo}</span>
    </label>
  ) : (
    <div className={style.container}>
      <Button
        type="button"
        variant="contained"
        color="error"
        sx={{
          minWidth: "auto",
          width: "1.7rem",
          height: "1.7rem",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top:"3px",
          right:"3px"
        }}
        onClick={deleteImageHandler}
      >
        <DeleteIcon
          sx={{ width: "90%", height: "90%", color:"white"}}
        />
      </Button>
      <img
        className={style.image}
        src={imagePreviewUrl?imagePreviewUrl:`http://localhost:8080/${editImageUrl}`}
        alt={inputValue?inputValue.name:""}
        loading="lazy"
      />
      <span className={style.imageInfo}>{inputValue ? inputValue.name : ""}</span>
    </div>
  );
}
