import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Backdrop from "../../UI/Backdrop";

export default function Navigation()
{
    const [isUnfolded,setIsUnfolded]=useState(false);

    return <Fragment>
        <Navbar setIsUnfolded={setIsUnfolded} isUnfolded={isUnfolded}/>
        <Sidebar isUnfolded={isUnfolded}/>
        <Backdrop isMenu={false} isUnfolded={isUnfolded} setIsVisible={setIsUnfolded}/>
    </Fragment>
}