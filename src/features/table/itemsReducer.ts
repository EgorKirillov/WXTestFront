import {setError, setIsInitialize, setStatusLoading} from "../../app/appStatusReducer";
import {AppThunk} from "../../app/store";


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
      // page: 1,
      currentPage: 1,
      pageSize: 4,
      totalCount: 500,
      sortTitle:'1count'} as QueryParamType
  
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

    default:
      return state
  }
}

// actions
export const setItems = (data: ItemType[]) =>
  ({type: 'items/SET-ITEMS', payload: data} as const)
export const changeQueryParams = (data: QueryParamType) =>
  ({type: 'items/CHANGE-QUERY-PARAMS', payload: data} as const)
export const clearQueryParams = () =>
  ({type: 'items/CLEAR-QUERY-PARAMS'} as const)

// thunks
export const loadItems = (): AppThunk =>
  async dispatch => {
    try {
      dispatch(setError(""))
      dispatch(setStatusLoading('loading'))
      //const res = await
      // dispatch(setItems(res.data.items))
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

export type InitialStateType = {
  items: ItemType[],
  queryParam: QueryParamType
}

export type ItemType = {
  id: string
  name: string
  date: string
  count: number
  distance: number
}
export type QueryParamType = {
  // page?: number
  currentPage?: number
  pageSize?: number
  totalCount?: number
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
