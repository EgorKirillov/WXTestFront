import React from 'react';
import {TableHeader} from "./tableHeader/tableHeader";
import {TableBody} from "./tableBody/tableBody";
import {Filter} from "./filter/filter";

export const Table = () => {
  return (<section>
      <Filter/>
      <table>
      
        <caption>Таблица наименование с датами количеством и дистанцией</caption>
      
        <TableHeader/>
        <TableBody/>
      </table>
    </section>
  );
};

