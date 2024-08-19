import { Link } from 'react-router-dom';
import style from './MainLink.module.css'

export default function MainLink(props) {
  const { url, children } = props;
  return (
    <div className={style.linkWrapper}>
      <Link to={url} className={style.link}>
        {children}
      </Link>
    </div>
  );
}
