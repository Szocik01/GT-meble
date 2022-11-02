import React from "react";
import { Fragment } from "react";
import style from "./SingleProduct.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { popUpInfoActions } from "../../storage/redux";

export default React.memo(function SingleProduct(props) {
  const { id, alt, image, title, token, setProducts } = props;

  const dispatch = useDispatch();

  const deleteItemHandler = async () => {
    try {
      const response = await fetch("http://localhost:8080/product/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          id: id,
        }),
      });
      if (response.status === 404) {
        throw new Error("Nie znaleziono produktu.");
      }
      if (response.status >= 500) {
        throw new Error("Wewnętrzy błąd serwera.");
      }
      setProducts((prevValue) => {
        return prevValue.filter((item) => {
          return item.id !== id;
        });
      });
      dispatch(
        popUpInfoActions.setMessage({
          isError: false,
          message: "Pomyślnie usunięto produkt.",
          isVisible: true,
        })
      );
    } catch (error) {
      dispatch(
        popUpInfoActions.setMessage({
          isError: true,
          message: error.message,
          isVisible: true,
        })
      );
    }
  };

  return (
    <Fragment>
      <div className={style.headerAndButtonsContainer}>
        <h3 className={style.itemsHeader}>{title}</h3>
        {token && <div className={style.buttonsContainer}>
          <Link to={`/product?itemId=${id}`} className={style.edit}>
            <ModeEditIcon
              sx={{
                width: "1.8rem",
                height: "1.8rem",
              }}
            />
          </Link>
          <button className={style.delete} onClick={deleteItemHandler}>
            <DeleteIcon
              sx={{
                width: "1.8rem",
                height: "1.8rem",
              }}
            />
          </button>
        </div>}
      </div>
      <div className={style.imageContainer}>
        <img alt={alt} src={image} />
      </div>
      <p className={style.text}>{props.children}</p>
    </Fragment>
  );
});
