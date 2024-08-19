import style from "./RealizationAdminButtons.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function RealizationAdminButtons(props) {
  const { realizationId, onDeleteRealization } = props;

  const muiButtonStyle = {
    padding: "6px",
    minWidth: "unset",
  };

  const muiIconStyle = { fontSize: "1.2rem" };
  return (
    <div className={style.container}>
      <Link to={`/admin/edit-realization/${realizationId}`}>
        <Button sx={muiButtonStyle} variant="contained">
          <ModeEditIcon sx={muiIconStyle} />
        </Button>
      </Link>
      <Button
        sx={muiButtonStyle}
        onClick={() => {
          onDeleteRealization(realizationId);
        }}
        variant="contained"
        color="error"
      >
        <DeleteIcon sx={muiIconStyle} />
      </Button>
    </div>
  );
}
