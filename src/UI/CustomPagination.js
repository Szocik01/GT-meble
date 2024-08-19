import { DEFAULT_PAGINATION_SIZE } from "../utils/Constants";
import { Pagination, PaginationItem } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

export default function CustomPagination(props) {
  const { sx, page, dataLength, paginationItemComponent } = props;

  const [searchParams] = useSearchParams();

  function getSearchStringWithPageFromSearchParams(searchParams, paginationItem) {
    let url = `${window.location.pathname}?`;
    const searchParamsObject = Object.fromEntries(searchParams.entries());

    for (const key in searchParamsObject) {
      if (key === "page") {
        continue;
      }
      url = url + `${key}=${searchParamsObject[key]}&`;
    }
    url = url + `page=${paginationItem.page}`;
    return url;
  }

  return (
    <Pagination
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0rem 1.5rem 0rem",
        ...sx,
      }}
      page={!isNaN(page) ? +page : 1}
      count={Math.ceil(dataLength / DEFAULT_PAGINATION_SIZE)}
      renderItem={(item) => (
        <PaginationItem
          component={paginationItemComponent ? paginationItemComponent : Link}
          to={getSearchStringWithPageFromSearchParams(searchParams, item)}
          {...item}
        />
      )}
    />
  );
}
