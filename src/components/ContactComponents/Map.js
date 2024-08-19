import React from "react";
import style from './Map.module.css'

export default function Map() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1285.2657229232132!2d18.60963684261608!3d49.88882514249861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ab24ef2a039b%3A0xc725f60ffb0ad03e!2sAkacjowa%2012%2C%2043-410%20Zebrzydowice!5e0!3m2!1spl!2spl!4v1694370635308!5m2!1spl!2spl"
      style={{border:0}}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={style.map}
    ></iframe>
  );
}
