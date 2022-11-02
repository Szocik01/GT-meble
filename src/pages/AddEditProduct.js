import style from "./AddEditProduct.module.css";
import SiteTextContainer from "../UI/SiteTextContainer";
import { useLocation } from "react-router-dom";
import ProductForm from "../components/AddEditProductComponents/ProductForm";



export default function AddEditProduct()
{
    const searchParamsString = useLocation().search;
    const searchParams = new URLSearchParams(searchParamsString);
    const itemId = searchParams.get("itemId");

    return<SiteTextContainer isObserving={false}>
        <h2 className={style.header}>{itemId ?"Edytuj":"Dodaj"} produkt</h2>
        <ProductForm itemId={itemId}/>
    </SiteTextContainer>
}