import React from 'react';
import {TableHeader} from "./tableHeader/tableHeader";
import {TableBody} from "./tableBody/tableBody";

export const Table = () => {
  return (
    <table>
      <caption>Таблица наименование с датами количеством и дистанцией</caption>
      <TableHeader/>
      <TableBody/>
    </table>
  );
};

