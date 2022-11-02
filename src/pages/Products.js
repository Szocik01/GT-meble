import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux";
import SiteTextContainer from "../UI/SiteTextContainer";
import SingleProduct from "../components/ProductsComponents/SingleProduct";
import style from "./Products.module.css";
import dorszImg from "../images/dorsz.jpg";
import karpImg from "../images/karp.jpg";
import lososImg from "../images/losos.jpg";
import karasImg from "../images/karas.jpg"

export default function Products()
{
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(1))
    },[dispatch]);

    return <Fragment>  
    <SiteTextContainer isObserving={false}>
        <h2 className={style.header}>POZNAJ NASZĄ OFERTĘ</h2>
        <SingleProduct alt="Karp image" title="Karp" image={karpImg}>Karp (Cyprinus carpio) – gatunek słodkowodnej ryby z rodziny karpiowatych (Cyprinidae). Średnio osiąga ponad 1 m długości i masę ponad 30 kg. Karp zaliczany jest do ryb średniotłustych. Znajdują się w nim nienasycone kwasy tłuszczowe: kwasy omega-3 i omega-6, które wspomagają pracę mózgu oraz zmniejszają ryzyko udaru mózgu i zawału serca. Karp jest też źródłem witamin z grupy B. Po obróbce termicznej mięso jest białe i kruche, delikatne w smaku, dość tłuste, o grubych, łatwych do usunięcia ościach.</SingleProduct>
        <SingleProduct alt="Dorsz image" title="Dorsz" image={dorszImg}>Dorsz atlantycki (Gadus morhua), nazywany również dorszem lub wątłuszem. W Polsce mianem dorsza określa się zwykle trzy podgatunki dorsza atlantyckiego, z których najbardziej znanym jest dorsz bałtycki. Jego mięso jest delikatne w smaku i nie ma dość nieprzyjemnego posmaku mułu. Dorsz jest dobrym źródłem kwasów tłuszczowych omega-3 i omega-6. Jest również bogaty w witaminy B12 i B6, niacynę, a także witaminy E, A i C. Jest dobrym źródłem fosforu, potasu, selenu i innych mikroelementów.</SingleProduct>
        <SingleProduct alt="Karaś image" title="Karaś" image={karasImg}>Karaś (Carassius carassius) – gatunek słodkowodnej ryby z rodziny karpiowatych (Cyprinidae). Średnio osiąga długość 40 cm i masę 1 kg. Jego mięso jest smaczne, białe, chude, lecz ościste. Karaś zawiera do 60% jadalnych części ciała, czyli nawet więcej niż karp. Zawartość tłuszczu w karasie sięga 6-7%, zawartość białka to 18% żywej wagi. Karaś to produkt, który zawiera dużą ilość witamin rozpuszczalnych w tłuszczach, takich jak witaminy A, C, D, E i B. Jest bogaty w jod, mangan, miedź i cynk.</SingleProduct>
        <SingleProduct alt="Łosoś image" title="Łosoś" image={lososImg}>Łosoś (Salmo salar) – ryba z rodziny łososiowatych (Salmonidae). Dorasta do 150 cm długości i 24 kg masy ciała. Łosoś ma wspaniałe soczyste mięso o charakterystycznym, wyraźnym smaku. Je się go na surowo – w postaci tatara oraz jako składnik sushi, smażonego i pieczonego oraz wędzonego. Łosoś jest rybą bogatą w witaminy i minerały. W mięsie łososia znajduje się najwięcej witamin z grupy B – B1, B2, B3, B6, B9, B12, a także A i E, nie brakuje w nim również witaminy D. Jeżeli chodzi o minerały, w łososiu można znaleźć: potas, fosfor, selen, wapń, żelazo, magnez, cynk, fluor, jod, niacyna.</SingleProduct>
    </SiteTextContainer>
    </Fragment>
}