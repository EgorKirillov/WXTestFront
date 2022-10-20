import {ColumnSortNames, SortColumnsType} from "../../features/table/itemsReducer";

//utilFunction create column name with sort value up or down
export const createColumnName = (name:ColumnSortNames, sort:SortColumnsType):string  =>{
  let result = name as string
  if (`0${name}`=== sort) {result =  `${result} '▼'`}
  else if (`1${name}`=== sort) {result =  `${result} '▲'`}
  return result.toUpperCase()
}