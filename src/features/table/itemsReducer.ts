import {setError, setIsInitialize, setStatusLoading} from "../../app/appStatusReducer";
import {AppThunk} from "../../app/store";
import {itemAPI} from "./itemAPI";


// temp value for DEV
const itemsData:ItemType[] = [
  {id:'1',name:'first', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'2',name:'second', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'3',name:'aaa', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'4',name:'AAA', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'5',name:'ddd', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'6',name:'11s5', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'7',name:'1ert', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'8',name:'_fgdf', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'9',name:'zzz', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'10',name:'ZZZ', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
  {id:'11',name:'YYY', date: (new Date(Math.random()*1660000000000)).toDateString(),distance: Math.ceil(Math.random()*1500), count: Math.floor(Math.random()*150)},
]

const initialState: InitialStateType = {
    items: itemsData as ItemType[],
    queryParam: {
      currentPage: 1,
      pageSize: 4,} as QueryParamType ,
  totalCount:10
}

export const itemsReducer = (state: InitialStateType = initialState, action: ItemsActionsType
): InitialStateType => {
  switch (action.type) {
    case 'items/SET-ITEMS':
      return {
        ...state,
        items: [...action.payload]
      }
    case 'items/CHANGE-QUERY-PARAMS':
      return {
        ...state,
        queryParam:  {...state.queryParam , ...action.payload}
      }
    case 'items/CLEAR-QUERY-PARAMS':
      return {
        ...state,
        queryParam: {} as QueryParamType
      }
    case 'items/SET-TOTAL-COUNT':
      return {
        ...state,
        totalCount: action.payload
      }
    default:
      return state
  }
}

// actions
export const setItems = (data: ItemType[]) =>
  ({type: 'items/SET-ITEMS', payload: data} as const)
export const setTotalCount = (totalCount:number) =>
  ({type: 'items/SET-TOTAL-COUNT', payload: totalCount} as const)

export const changeQueryParams = (data: QueryParamType) =>
  ({type: 'items/CHANGE-QUERY-PARAMS', payload: data} as const)
export const clearQueryParams = () =>
  ({type: 'items/CLEAR-QUERY-PARAMS'} as const)

// thunks
export const loadItems = (): AppThunk =>
  async (dispatch,  getState) => {
    try {
      dispatch(setError(""))
      dispatch(setStatusLoading('loading'))
      const queryParams:QueryParamType = getState().items.queryParam
      const res = await itemAPI.getItems(queryParams)
      dispatch(setItems(res.data.items))
      dispatch(setTotalCount(res.data.totalCount))
      dispatch(setStatusLoading('succeeded'))
      dispatch(setIsInitialize(true))
      
    } catch (e) {
      console.log(e)
    } finally {
      
    }
  }


// types
export type ItemsActionsType =
  | ReturnType<typeof setItems>
  | ReturnType<typeof changeQueryParams>
  | ReturnType<typeof clearQueryParams>
  | ReturnType<typeof setTotalCount>

export type InitialStateType = {
  items: ItemType[],
  queryParam: QueryParamType
  totalCount?: number
}

export type ItemType = {
  id: string | number
  name: string
  date: string
  count: number
  distance: number
}
export type QueryParamType = {
  currentPage?: number
  pageSize?: number
  sortTitle?: SortColumnsType
  filterTitle?: ColumnFilterNames
  filterMethod?: ColumnFilterMethod
  filterValue?: string | number
  
}

export type ColumnSortNames = 'name' | 'count' | 'distance'
export type ColumnFilterNames = 'name' | 'count' | 'distance'| 'date'
export type ColumnFilterMethod = 'equal' | 'includes' | 'more'| 'lower'

//  0{columnName} - low to high,  1{columnName} - high to low
export type SortColumnsType = `0${ColumnSortNames}` | `1${ColumnSortNames}` | undefined
