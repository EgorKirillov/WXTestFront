import React, {useEffect} from 'react';

import {TableHeader} from "./tableHeader/tableHeader";
import {TableBody} from "./tableBody/tableBody";
import {Filter} from "./filter/filter";
import {Paginator} from "./paginator/paginator";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {loadItems} from "../itemsReducer";
import {NotFound} from "./notFound/notFound";

import styles from './table.module.css'
import {Loader} from "./loader/loader";

export const Table = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading==='loading'
  const queryParams = useAppSelector(state => state.items.queryParam)
  const totalCount = useAppSelector(state => state.items.totalCount)
  
  const emptyTable = totalCount === 0
  const isFiltered = !!queryParams.filterValue && !!queryParams.filterMethod && !!queryParams.filterTitle

  //ничего не найдено если таблица пустая и есть условия фильтрации
  const notFound = emptyTable && isFiltered
  
  const dispatch = useAppDispatch()
  
  //при изменении query параметров запрашиваю данные с сервера
  useEffect(() => {
    dispatch(loadItems())
  }, [queryParams, dispatch])
  
  return (
    <section className={styles.tableContainer}>
      
      <Filter/>
      
      <Paginator/>
      {/*<Loader hidden={isLoading}/>*/}
      {notFound
        ? <NotFound/>
        : <table className={styles.table}>
          <TableHeader/>
          <TableBody/>
          <caption className={styles.discription}>Таблица наименование с датами количеством и дистанцией
            <Loader hidden={isLoading}/>
          </caption>
        </table>}
    
    </section>
  );
};

