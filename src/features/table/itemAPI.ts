import { instance } from "../../app/instanceAPI"
import {ItemType, QueryParamType} from "./itemsReducer";

export const itemAPI = {
  getItems(param:QueryParamType ) {
    return instance.get<GetItemsResponseType>('/', { params: param })
  },
  // createItems(newItem: ) {  //   return instance.post<>('/', { item: ItemType })
  // },
}

//types
//Response Types
type GetItemsResponseType = {
  pageSize: number,
  currentPage: number,
  items: ItemType[],
  totalCount:number
}
