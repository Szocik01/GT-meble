import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { positionActions, popUpInfoActions } from "../storage/redux";
import SiteTextContainer from "../UI/SiteTextContainer";
import style from "./Prices.module.css";
import SinglePriceItem from "../components/PricesComponents/SinglePriceItem";
import ContentLoading from "../UI/ContentLoading";
import NoData from "../UI/NoData";

export default function Prices() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(2));
  }, [dispatch]);

  const fetchPrices = useCallback(async () => {
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
    fetchPrices();
  }, [fetchPrices]);

  return (
    <SiteTextContainer>
      {isLoading ? (
        <ContentLoading />
      ) : products.length === 0 ? (
        <NoData>Nie znaleziono żadnych produktów.</NoData>
      ) : (
        <div className={style.container}>
          <h2 className={style.header}>SPRAWDŹ NASZE CENY</h2>
          {products.map((item) => {
            return (
              <SinglePriceItem key={item.id} name={item.name} price={item.price.toFixed(2)} />
            );
          })}
        </div>
      )}
    </SiteTextContainer>
  );
}
