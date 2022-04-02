import style from "./Logo.module.css"

export default function Logo()
{
    return <div className={style.logoContainer}>
    <span className={style.logoText}>Gecho</span>
    <svg width="375px" height="375px" xmlns="http://www.w3.org/2000/svg">
        <defs>
        <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_2_blur">
        <feGaussianBlur stdDeviation="0.5" in="SourceGraphic"/>
        </filter>
        <filter id="svg_3_blur">
        <feGaussianBlur stdDeviation="0.5" in="SourceGraphic"/>
        </filter>
        <filter id="svg_4_blur">
        <feGaussianBlur stdDeviation="0.5" in="SourceGraphic"/>
        </filter>
        <filter id="svg_7_blur">
        <feGaussianBlur stdDeviation="1.5" in="SourceGraphic"/>
        </filter>
        </defs>
        <g>
            <title>Layer 1</title>
            <path transform="rotate(45 187.676 187.676)" filter="url(#svg_2_blur)" stroke="#000" id="svg_2" d="m55.67619,55.67619l264,0l0,264l-264,0l0,-264z" opacity="undefined" strokeWidth="2" fill="#BBBBBB"/>
            <rect transform="rotate(45 187.676 186.176)" filter="url(#svg_3_blur)" opacity="0.68" id="svg_3" height="235" width="235" y="68.6762" x="70.17619" stroke="#000" fill="#A4FFFF"/>
            <rect filter="url(#svg_4_blur)" id="svg_4" height="265" width="265" y="48.6762" x="55.17619" stroke="#000" fill="#fff"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_7" y2="25.6762" x2="196.27619" y1="17.6762" x1="204.27619" stroke="#000" fill="none"/>
            <path stroke="#000" id="svg_19" d="m215.27684,28.17678l-8,8" filter="url(#svg_7_blur)" opacity="undefined" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_20" y2="46.67895" x2="218.27908" y1="38.67895" x1="226.27908" stroke="#000" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_21" y2="151.19266" x2="321.79265" y1="143.19266" x1="329.79265" stroke="#000" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_22" y2="162.69416" x2="333.79423" y1="154.69416" x1="341.79423" stroke="#000" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_23" y2="175.69546" x2="345.79553" y1="167.69546" x1="353.79553" stroke="#000" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_24" y2="202.69941" x2="19.75304" y1="194.69941" x1="27.75304" stroke="#000" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_25" y2="214.70098" x2="32.25468" y1="206.70098" x1="40.25468" stroke="#000" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_26" y2="227.20262" x2="44.25627" y1="219.20262" x1="52.25627" stroke="#000" fill="none"/>
            <line stroke="#000" filter="url(#svg_7_blur)" opacity="0.8" id="svg_27" y2="322.71514" x2="140.26885" y1="314.71514" x1="148.26885" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_28" y2="335.71685" x2="154.77076" y1="327.71685" x1="162.77076" stroke="#000" fill="none"/>
            <line filter="url(#svg_7_blur)" opacity="0.8" id="svg_29" y2="350.21876" x2="168.77258" y1="342.21876" x1="176.77258" stroke="#000" fill="none"/>
        </g>
   </svg></div>
    
}