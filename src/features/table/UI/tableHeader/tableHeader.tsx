import React from 'react';
import styles from './tableHeader.module.css'

const TableHeader = () => {
  return (
    <thead className={styles.tableHeader}>
    <tr className={styles.tableHeaderRow}>
      <th className={styles.name}>Наименование</th>
      <th className={styles.date}>Дата</th>
      <th className={styles.count}>Количество</th>
      <th className={styles.distance}>Расстояние</th>
    </tr>
    </thead>
  );
};

export default TableHeader;