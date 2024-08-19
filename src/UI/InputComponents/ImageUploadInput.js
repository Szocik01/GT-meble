import style from "./ImageUploadInput.module.css";
import ImageIcon from "@mui/icons-material/Image";
import { useRef} from "react";

export default function ImageUploadInput(props) {
  const {
    dropzoneText,
    onUploadImages,
  } = props;

  const labelRef = useRef();

  function dragoverImageHandler(event) {
    event.preventDefault();
    event.currentTarget.classList.add(style.draggedOver);
  }

  function dragLeaveImageHandler(event) {
    if (event.relatedTarget.closest("label") !== labelRef.current) {
      event.currentTarget.classList.remove(style.draggedOver);
    }
  }

  function dropImageHandler(event) {
    event.preventDefault();
    event.currentTarget.classList.remove(style.draggedOver);
    const files = event.dataTransfer.files;
    onUploadImages(files);
  }

  function setImageFileHandler(event) {
    const files = event.target.files;
    onUploadImages(files);
  }

  return (
    <label className={style.container} ref={labelRef}>
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
        <span className={style.text}>{dropzoneText}</span>
        <input
          type="file"
          multiple
          name="images-file-input"
          className={style.input}
          onChange={setImageFileHandler}
        />
      </div>
    </label>
  );
}