import PostsDisplay from "../../ProductsComponents/PostsDisplay";
import useHttp from "../../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../../utils/Constants";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { popUpInfoActions } from "../../../storage/redux";
import ContentLoading from "../../../UI/ContentLoading";
import Filters from "../../../UI/Filters";
import style from "./Realizations.module.css";
import CustomPagination from "../../../UI/CustomPagination";

export default function Realizations() {
  const [postsData, setPostsData] = useState({});
  const [fetchProducts, isLoading] = useHttp(`${API_CALL_URL_BASE}/posts`);
  const [deleteProduct, isDeleting] = useHttp(
    `${API_CALL_URL_BASE}/post/delete/`
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") !== null ? searchParams.get("page") : 1;
  const category =
    searchParams.get("category") !== null ? searchParams.get("category") : "";
  const title =
    searchParams.get("title") !== null ? searchParams.get("title") : "";

  const filterValuesObject = { category, title };

  const dispatch = useDispatch();

  const token = useSelector((state) => {
    return state.loginData.token;
  });

  let posts = [];

  const handleProductsResponse = useCallback(function (response) {
    if (!response.ok) {
      throw new Error("Błąd serwera. Nie można pobrać danych");
    }
    return response.json().then((data) => {
      setPostsData(data);
    });
  }, []);

  const handleProductsError = useCallback(
    function (error) {
      dispatch(
        popUpInfoActions.setMessage({
          isError: true,
          message: error.message,
          isVisible: true,
        })
      );
    },
    [dispatch]
  );

  const handleDeleteResponse = useCallback(function (response, id) {
    if (response.status === 404) {
      throw new Error("Nie znaleziono produktu.");
    }
    if (response.status >= 500) {
      throw new Error("Wewnętrzy błąd serwera.");
    }
    if (!response.ok) {
      throw new Error("Nie udało się usunąć produktu.");
    }

    setPostsData((prevValue) => {
      const newValue = {};
      newValue.postsContent = prevValue.postsContent.filter((item) => {
        return item.id !== id;
      });
      newValue.postsPhotos = prevValue.postsPhotos.filter((item) => {
        return item.post_content_id !== id;
      });
      return newValue;
    });
    dispatch(
      popUpInfoActions.setMessage({
        isError: false,
        message: "Pomyślnie usunięto produkt.",
        isVisible: true,
      })
    );
  }, []);

  const handleDeleteError = useCallback(
    function (error) {
      dispatch(
        popUpInfoActions.setMessage({
          isError: true,
          message: error.message,
          isVisible: true,
        })
      );
    },
    [dispatch]
  );

  function onFilterInputChangeHandler(inputDataObject) {
    setSearchParams(
      (prevParams) => {
        prevParams.set("page", 1);
        prevParams.set(inputDataObject.name, inputDataObject.value);
        return prevParams;
      },
      { replace: true }
    );
  }

  if (postsData.postsContent) {
    posts = postsData.postsContent;
    posts = posts.filter((item) => {
      return item.title
        .toLowerCase()
        .trim()
        .includes(title.trim().toLowerCase());
    });
    if (category !== "") {
      posts = posts.filter((item) => {
        return item.category === category;
      });
    }
  }

  useEffect(() => {
    fetchProducts(handleProductsResponse, handleProductsError);
  }, [fetchProducts, handleProductsError, handleProductsResponse]);

  return (
    <>
      <h1 className={style.header}>Realizacje</h1>
      {isLoading ? (
        <ContentLoading />
      ) : (
        <>
          {isDeleting && <ContentLoading coverParent={true} />}
          <Filters
            categories={postsData.postsCategories}
            onInputChangeHandler={onFilterInputChangeHandler}
            values={filterValuesObject}
            adminMode={true}
          />
          <PostsDisplay
            adminMode={true}
            posts={posts}
            page={page}
            postsPhotos={postsData.postsPhotos}
            onDeleteRealization={(realizationId) => {
              deleteProduct(
                (response) => {
                  handleDeleteResponse(response, realizationId);
                },
                handleDeleteError,
                { method: "DELETE", headers: { Authorization: token } },
                realizationId
              );
            }}
          />
          {posts.length !== 0 ? (
            <CustomPagination page={page} dataLength={posts.length} />
          ) : null}
        </>
      )}
    </>
  );
}
