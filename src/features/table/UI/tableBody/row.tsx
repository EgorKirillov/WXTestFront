import React from 'react';
import {ItemType} from "../../itemsReducer";

type RowType = {
  // order: number
  item:ItemType
}

export const Row = ({item}:RowType) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.date}</td>
      <td>{item.count}</td>
      <td>{item.distance}</td>
    </tr>
  );
};
