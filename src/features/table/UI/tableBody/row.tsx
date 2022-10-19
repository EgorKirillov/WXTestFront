import React from 'react';
import {ItemType} from "../../itemsReducer";
import styles from './tableBody.module.css'

type RowType = {
  // order: number
  item:ItemType
}

export const Row = ({item}:RowType) => {
  return (
    <tr className={styles.row}>
      <td className={styles.name}>{item.name}</td>
      <td className={styles.date}>{item.date}</td>
      <td className={styles.count} >{item.count}</td>
      <td className={styles.distance}>{item.distance}</td>
    </tr>
  );
};
