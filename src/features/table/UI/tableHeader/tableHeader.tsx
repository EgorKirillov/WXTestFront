import React, {MouseEvent} from 'react';
import styles from './tableHeader.module.css'
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {createColumnName} from "../../../../common/utils/createColumnName";
import {ColumnSortNames, setQueryParams, SortColumnsType} from "../../itemsReducer";

export const TableHeader = () => {
  
  const sortColumn = useAppSelector(state => state.items.queryParam.sortTitle)
  
  const dispatch = useAppDispatch()
  
  const sortByColumnName = (e: MouseEvent<HTMLTableHeaderCellElement>) => {
    const name = e.currentTarget.id as ColumnSortNames
    let sortValue = `1${name}` as SortColumnsType
    if (sortColumn === `1${name}`) {
      sortValue = `0${name}` as SortColumnsType
    }
    dispatch(setQueryParams({sortTitle: sortValue}))
    
  }
  
  return (
    <thead className={styles.tableHeader}>
    <tr className={styles.tableHeaderRow}>
      <th className={styles.name} onClick={sortByColumnName} id={'name'}>{createColumnName("name", sortColumn)}</th>
      <th className={styles.date}>DATE</th>
      <th className={styles.count} onClick={sortByColumnName} id={'count'}>{createColumnName("count", sortColumn)}</th>
      <th className={styles.distance} onClick={sortByColumnName}
          id={'distance'}>{createColumnName("distance", sortColumn)}</th>
    </tr>
    </thead>
  );
};

