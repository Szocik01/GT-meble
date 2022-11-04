import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { positionActions, popUpInfoActions } from "../storage/redux";
import SiteTextContainer from "../UI/SiteTextContainer";
import NoData from "../UI/NoData";
import SingleProduct from "../components/ProductsComponents/SingleProduct";
import style from "./Products.module.css";
import { useSelector } from "react-redux";
import ContentLoading from "../UI/ContentLoading";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const token = useSelector((state) => {
    return state.loginData.token;
  });

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://ryby-nodejs.herokuapp.com/products", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Błąd serwera. Nie można pobrać danych");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      dispatch(
        popUpInfoActions.setMessage({
          isError: true,
          message: error.message,
          isVisible: true,
        })
      );
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(1));
  }, [dispatch]);

  return (
    <SiteTextContainer isObserving={false}>
      <h2 className={style.header}>POZNAJ NASZĄ OFERTĘ</h2>
      {isLoading ? (
        <ContentLoading />
      ) : products.length === 0 ? (
        <NoData>Nie znaleziono żadnych produktów.</NoData>
      ) : (
        products.map((item) => {
          return (
            <SingleProduct
              id={item.id}
              key={item.id}
              title={item.name}
              alt={item.name}
              image={`https://ryby-nodejs.herokuapp.com/${item.imageURL}`}
              token={token}
              setProducts={setProducts}
            >
              {item.description}
            </SingleProduct>
          );
        })
      )}
      {isLoading || !token ? (
        ""
      ) : (
        <div className={style.buttonContainer}>
          <Link to="/product">
            <Button
              type="button"
              color="success"
              variant="contained"
              size="large"
            >
              Dodaj produkt
            </Button>
          </Link>
        </div>
      )}
    </SiteTextContainer>
  );
}
