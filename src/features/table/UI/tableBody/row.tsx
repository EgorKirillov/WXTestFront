import React from 'react';
import {ItemType} from "../../itemsReducer";

type RowType = {
  item:ItemType
}

export const Row = ({item}:RowType) => {
  
  //преобразование отображения даты
  const date = new Date(item.date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <tr>
      <td>{item.name}</td>
      <td>{date}</td>
      <td>{item.count}</td>
      <td>{item.distance}</td>
    </tr>
  );
};
