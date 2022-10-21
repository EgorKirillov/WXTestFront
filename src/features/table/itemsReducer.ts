import {setError, setStatusLoading} from "../../app/appStatusReducer";
import {AppThunk} from "../../app/store";
import {itemAPI} from "./itemAPI";


// temp value for DEV
const itemsData: ItemType[] = [ {
    id: '',
    name: 'no data',
    date: new Date(1),
    distance: 0,
    count: 0
  },
]

const initialState: InitialStateType = {
  items: itemsData as ItemType[],
  queryParam: {
    currentPage: 1,
    pageSize: 4,
  } as QueryParamType,
  totalCount: 10
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
        queryParam: {...state.queryParam, ...action.payload}
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
    case 'items/CLEAR-FILTER':
      return {
        ...state,
        queryParam: {
          pageSize: state.queryParam.pageSize,
          currentPage: state.queryParam.currentPage,
          sortTitle: state.queryParam.sortTitle
        }
      }
    default:
      return state
  }
}

// actions
export const setItems = (data: ItemType[]) =>
  ({type: 'items/SET-ITEMS', payload: data} as const)
export const setTotalCount = (totalCount: number) =>
  ({type: 'items/SET-TOTAL-COUNT', payload: totalCount} as const)

export const changeQueryParams = (data: QueryParamType) =>
  ({type: 'items/CHANGE-QUERY-PARAMS', payload: data} as const)
export const clearQueryParams = () =>
  ({type: 'items/CLEAR-QUERY-PARAMS'} as const)
export const clearFilter = () =>
  ({type: 'items/CLEAR-FILTER'} as const)

// thunks
export const loadItems = (): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setError(""))
      dispatch(setStatusLoading('loading'))
      const queryParams: QueryParamType = getState().items.queryParam
      const res = await itemAPI.getItems(queryParams)
      dispatch(setItems(res.data.items))
      dispatch(setTotalCount(res.data.totalCount))
      dispatch(setStatusLoading('succeeded'))
      
    } catch (e) {
      console.log(e)
      dispatch(setStatusLoading('failed'))
      // @ts-ignore
      dispatch(setError(e.message))
      
    } finally {
      
    }
  }


// types
export type ItemsActionsType =
  | ReturnType<typeof setItems>
  | ReturnType<typeof changeQueryParams>
  | ReturnType<typeof clearQueryParams>
  | ReturnType<typeof setTotalCount>
  | ReturnType<typeof clearFilter>

export type InitialStateType = {
  items: ItemType[],
  queryParam: QueryParamType
  totalCount: number
}

export type ItemType = {
  id: string | number
  name: string
  date: Date
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
export type ColumnFilterNames = 'name' | 'count' | 'distance' | 'date'
export type ColumnFilterMethod = 'equal' | 'includes' | 'more' | 'lower'

//  0{columnName} - low to high,  1{columnName} - high to low
export type SortColumnsType = `0${ColumnSortNames}` | `1${ColumnSortNames}` | undefined
