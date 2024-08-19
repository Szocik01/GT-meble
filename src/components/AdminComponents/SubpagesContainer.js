import { Outlet } from 'react-router-dom';
import style from './SubpagesContainer.module.css';

export default function SubpagesContainer() {
    


    return <div className={style.container}>
        <Outlet/>
    </div>
}