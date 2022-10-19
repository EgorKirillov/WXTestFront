import React from 'react';
import {useAppSelector} from "../../../../common/hooks/hooks";
import {Row} from "./row";
import styles from './tableBody.module.css'

export const TableBody = () => {
  const items = useAppSelector(state => state.items.items)
  const tableData = items.map((item) => <Row key={item.id} item={item}/>)
  
  return (
    <tbody className={styles.tableBody}> {tableData} </tbody>
  );
};

