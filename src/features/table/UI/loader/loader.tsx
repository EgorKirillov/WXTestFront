import React from 'react';
import s from './loader.module.css'

export const Loader = ({hidden}: {hidden:boolean } ) => {
  return (
    <div className={s.linearActivity} style={!hidden ? {visibility:"hidden"} : {}}>
      <div className={s.indeterminate} > </div>
    </div>
  );
};

