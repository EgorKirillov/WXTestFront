import React, {useEffect} from 'react';
import {TableHeader} from "./tableHeader/tableHeader";
import {TableBody} from "./tableBody/tableBody";
import {Filter} from "./filter/filter";
import {Paginator} from "./paginator/paginator";
import styles from './table.module.css'
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {loadItems} from "../itemsReducer";

export const Table = () => {
  const queryParams = useAppSelector(state => state.items.queryParam)
  const  dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(loadItems())
  },[queryParams])
  return (
    <section className={styles.tableContainer}>
      
      <Filter/>
      <Paginator/>
      
      <table className={styles.table}>
        <TableHeader/>
        <TableBody/>
        <caption className={styles.discription}>Таблица наименование с датами количеством и дистанцией</caption>
      </table>
    
    </section>
  );
};

