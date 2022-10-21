import React from 'react';
import style from './notFound.module.css'

export const NotFound = () => {
  return (
    <div className={style.container}>
      {/*<img src={notFoundImg} alt="не найдено"/>*/}
      <div className={style.title}>Мы ничего не нашли</div>
      <div className={style.text}>Попробуй скорректировать запрос</div>
    </div>
  );
};

