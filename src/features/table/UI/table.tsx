import React from 'react';
import {TableHeader} from "./tableHeader/tableHeader";
import {TableBody} from "./tableBody/tableBody";
import {Filter} from "./filter/filter";
import {Paginator} from "./paginator/paginator";

export const Table = () => {
  return (<section>
      <Filter/>
      <Paginator />
      <table>
      
        <caption>Таблица наименование с датами количеством и дистанцией</caption>
      
        <TableHeader/>
        <TableBody/>
      </table>
    </section>
  );
};

