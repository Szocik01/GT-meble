import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { positionActions, popUpInfoActions } from "../storage/redux";
import PostsDisplay from "../components/ProductsComponents/PostsDisplay";
import TwoColumns from "../UI/Layouts/TwoColumns";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useSearchParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Filters from "../UI/Filters";
import CustomPagination from "../UI/CustomPagination";
import ContentLoading from "../UI/ContentLoading";

export default function Realizations(props) {
  const [postsData, setPostsData] = useState({});
  const [fetchProducts, isLoading] = useHttp(`${API_CALL_URL_BASE}api/posts`);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const page = searchParams.get("page") !== null ? searchParams.get("page") : 1;
  const category =
    searchParams.get("category") !== null ? searchParams.get("category") : "";
  const title =
    searchParams.get("title") !== null ? searchParams.get("title") : "";

  const filterValuesObject = { category, title };

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

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(2));
  }, [dispatch]);

  return (
    <>
      <TwoColumns
        marginBottom={true}
        title={"Poznaj nasze realizacje"}
        sideElement={
          <Filters
            categories={postsData.postsCategories}
            onInputChangeHandler={onFilterInputChangeHandler}
            values={filterValuesObject}
          />
        }
      >
        {isLoading ? (
          <ContentLoading />
        ) : (
          <PostsDisplay
            posts={posts}
            page={page}
            postsPhotos={postsData.postsPhotos}
          />
        )}
      </TwoColumns>
      {posts.length !== 0 ? (
        <CustomPagination page={page} dataLength={posts.length} />
      ) : null}
    </>
  );
}
