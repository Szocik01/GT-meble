import style from "./PostsDisplay.module.css";
import NoData from "../../UI/NoData";
import SingleProduct from "../../components/ProductsComponents/SingleProduct";

import { DEFAULT_PAGINATION_SIZE } from "../../utils/Constants";

export default function PostsDisplay(props) {
  const { adminMode, posts, page, postsPhotos,  onDeleteRealization } = props;

  return (
    <>
      {posts.length === 0 ? (
        <NoData>Nie znaleziono żadnych realizacji.</NoData>
      ) : (
        <div className={style.cardsContainer}>
          {posts
            .slice(
              DEFAULT_PAGINATION_SIZE * (page - 1),
              DEFAULT_PAGINATION_SIZE * page
            )
            .map((item) => {
              const photos = postsPhotos.filter((photo) => {
                return photo.post_content_id === item.id;
              });
              return (
                <SingleProduct
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  images={photos}
                  category={item.category}
                  adminMode={!!adminMode}
                  onDeleteRealization={onDeleteRealization}
                  description={item.description}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
