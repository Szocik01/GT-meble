import style from "./RealizationDetail.module.css";
import SingleColumn from "../UI/Layouts/SingleColumn";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";
import ContentLoading from "../UI/ContentLoading";
import NoData from "../UI/NoData";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { popUpInfoActions, positionActions } from "../storage/redux";
import ImagesGallery from "../components/RealizationDetailComponents/ImagesGallery";
import DetailHeader from "../components/RealizationDetailComponents/DetailHeader";

export default function RealizationDetail() {
  const [model, setModel] = useState(null);
  const { realizationId } = useParams();
  const [fetchRealizationData, isLoading] = useHttp(
    `${API_CALL_URL_BASE}api/post/${realizationId}`, true
  );
  const dispatch = useDispatch();

  const handleGetDataRequest = useCallback((response) => {
    if (!response.ok) {
      throw new Error("Nie udało się pobrać danych");
    }
    return response.json().then((data) => {
      setModel(data);
    });
  }, []);

  const handleGetDataError = useCallback(
    (error) => {
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

  useEffect(() => {
    fetchRealizationData(handleGetDataRequest, handleGetDataError);
  }, [fetchRealizationData, handleGetDataRequest, handleGetDataError]);

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(2));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <ContentLoading />
      ) : model == null ? (
        <NoData>Nie znaleziono realizacji</NoData>
      ) : (
        <SingleColumn htmlOptions={{ style: { backgroundColor: "white", padding: "0 2rem" } }}>
          <DetailHeader
            title={model.postContent.title}
            subtitle={model.postContent.category}
          />
          <img
            className={style.mainImage}
            src={`${API_CALL_URL_BASE}/${model.postPhotos[0].path}`}
            alt=""
          />
          <div
            className={style.description}
            dangerouslySetInnerHTML={{ __html: model.postContent.description }}
          ></div>

          <ImagesGallery images={model.postPhotos} />
        </SingleColumn>
      )}
    </>
  );
}
