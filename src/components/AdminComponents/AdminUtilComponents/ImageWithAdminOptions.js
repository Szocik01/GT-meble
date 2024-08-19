import style from "./ImageWithAdminOptions.module.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ImageWithAdminOptions(props) {
  const { url, alt, onDeleteImage } = props;

  return (
    <div className={style.container}>
      <img src={url} alt={alt} className={style.image} />
      {onDeleteImage && <Button
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
          top: "3px",
          right: "3px",
        }}
        onClick={onDeleteImage}
      >
        <DeleteIcon sx={{ width: "90%", height: "90%", color: "white" }} />
      </Button>}
    </div>
  );
}
