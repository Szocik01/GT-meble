import style from "./ProductForm.module.css";
import SingleInput from "../../UI/InputComponents/SingleInput";
import { useState, useEffect, useCallback } from "react";
import TextAreaInput from "../../UI/InputComponents/TextAreaInput";
import ImageUploadInput from "../../UI/InputComponents/ImageUploadInput";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { positionActions, popUpInfoActions } from "../../storage/redux";

function isLengthCorrectValidation(text) {
  if (text.trim().length > 0) {
    return true;
  }
  return false;
}

export default function ProductForm(props) {
  const { itemId } = props;

  const [productName, setProductName] = useState("");
  const [productNameErrorInfo, setProductNameErrorInfo] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productDescErrorInfo, setProductDescErrorInfo] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPriceErrorInfo, setPriceErrorInfo] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productImageErrorInfo, setProductImageErrorInfo] = useState("");
  const [serverErrorInfo, setServerErrorInfo] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.loginData.token);

  function nameValidation() {
    const isLengthValid = isLengthCorrectValidation(productName);
    if (!isLengthValid) {
      setProductNameErrorInfo("Proszę podać nazwę produktu.");
      return false;
    }
    return true;
  }

  function descriptionValidation() {
    const isLengthValid = isLengthCorrectValidation(productDesc);
    if (!isLengthValid) {
      setProductDescErrorInfo("Proszę podać opis produktu.");
      return false;
    }
    return true;
  }

  function priceValidation() {
    if (productPrice <= 0) {
      setPriceErrorInfo("Proszę podać wartość większą od 0.");
      return false;
    }
    return true;
  }

  function imageValidation(file) {
    if (!file) {
      setProductImageErrorInfo("Proszę dodać zdjęcie");
      return false;
    }
    if (
      !(
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
    ) {
      setProductImageErrorInfo(
        "Proszę podać odpowiedni format pliku: PNG, JPG lub JPEG."
      );
      return false;
    }
    return true;
  }

  const submitDataHandler = async (event) => {
    setServerErrorInfo("");
    event.preventDefault();
    let httpMethod = "POST";
    const isNameValid = nameValidation();
    const isDescValid = descriptionValidation();
    const isPriceValid = priceValidation();
    let isImageValid;
    if (itemId) {
      httpMethod = "PUT";
    }
    if (editImageUrl) {
      isImageValid = editImageUrl.includes("image");
    } else {
      isImageValid = imageValidation(productImage);
    }
    if (!isNameValid || !isDescValid || !isPriceValid || !isImageValid) {
      return;
    }
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDesc);
    formData.append("price", productPrice);
    if (itemId) {
      formData.append("id", itemId);
    }
    if (editImageUrl) {
      formData.append("imageUrl", editImageUrl);
    } else {
      formData.append("image", productImage);
    }
    try {
      const response = await fetch(
        `https://ryby-nodejs.herokuapp.com/product/${
          httpMethod === "PUT" ? "edit" : "add"
        }`,
        {
          method: httpMethod,
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );
      if (response.status === 400) {
        throw new Error("Produkt o tej nazwie już istnieje.");
      } else if (response.status === 401) {
        throw new Error("Nie masz uprawnień do tej operacji.");
      } else if (response.status === 404) {
        throw new Error("Nie znaleziono produktu o podanym id.");
      } else if (response.status === 422) {
        throw new Error("Nie podano wszystkich danych.");
      } else if (response.status >= 500) {
        throw new Error("Wewnętrzny błąd serwera");
      }
      if(!itemId)
      {
        setProductName("");
        setProductDesc("");
        setProductPrice("");
        setProductImage(null);
      }

      dispatch(
        popUpInfoActions.setMessage({
          message: `Pomyślnie ${itemId ? "edytowano" : "dodano"} produkt`,
          isError: false,
          isVisible: true,
        })
      );
    } catch (error) {
      setServerErrorInfo(error.message);
    }
  };

  const fetchProduct = useCallback(async () => {
    setServerErrorInfo("");
    try {
      const response = await fetch(`https://ryby-nodejs.herokuapp.com/product/${itemId}`);
      if (response.status === 404) {
        throw new Error("Nie znaleziono produktu.");
      } else if (response.status >= 500) {
        throw new Error("Wewnętrzy błąd serwera.");
      }
      const product = await response.json();
      setProductName(product.name);
      setProductDesc(product.description);
      setProductPrice(product.price);
      setEditImageUrl(product.imageURL);
    } catch (error) {
      setServerErrorInfo(error.message);
    }
  }, [itemId]);

  useEffect(() => {
    if (itemId) {
      fetchProduct();
    }
  }, [itemId, fetchProduct]);

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(1));
  }, [dispatch]);

  return (
    <form className={style.form} onSubmit={submitDataHandler}>
      <SingleInput
        inputOptions={{ name: "name", type: "text" }}
        title="Nazwa"
        inputValue={productName}
        setValue={setProductName}
        validationErrorInfo={productNameErrorInfo}
        setValidationErrorInfo={setProductNameErrorInfo}
        validationFunction={nameValidation}
      />
      <SingleInput
        inputOptions={{ name: "price", type: "number", step: "any", min: "0" }}
        title="Cena"
        inputValue={productPrice}
        setValue={setProductPrice}
        validationErrorInfo={productPriceErrorInfo}
        setValidationErrorInfo={setPriceErrorInfo}
        validationFunction={priceValidation}
      />
      <TextAreaInput
        inputOptions={{ rows: 8 }}
        title="Opis produktu"
        inputValue={productDesc}
        setValue={setProductDesc}
        validationErrorInfo={productDescErrorInfo}
        setValidationErrorInfo={setProductDescErrorInfo}
        validationFunction={descriptionValidation}
      />
      <ImageUploadInput
        name="image"
        text="Dodaj zdjęcie"
        setValue={setProductImage}
        inputValue={productImage}
        validationFunction={imageValidation}
        validationErrorInfo={productImageErrorInfo}
        setValidationErrorInfo={setProductImageErrorInfo}
        editImageUrl={editImageUrl}
        setEditImageUrl={setEditImageUrl}
      />
      {serverErrorInfo ? (
        <div className={style.serverError}>{serverErrorInfo}</div>
      ) : (
        ""
      )}
      <Button type="submit" color="success" variant="contained" size="large">
        {`${itemId ? "Edytuj" : "Dodaj"} produkt`}
      </Button>
    </form>
  );
}
