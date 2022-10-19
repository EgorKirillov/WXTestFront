import {setError, setIsInitialize, setStatusLoading} from "../../app/appStatusReducer";
import {AppThunk} from "../../app/store";

const initialState: InitialStateType = {
  items: [] as ItemType[],
  queryParam: {} as QueryParamType
  
}

export const itemsReducer = (state: InitialStateType = initialState, action: ItemsActionsType
): InitialStateType => {
  switch (action.type) {
    case 'items/SET-ITEMS':
      return {
        ...state,
        items: [...action.payload]
      }
    case 'items/SET-QUERY-PARAMS':
      return {
        ...state,
        queryParam: {...action.payload}
      }

    default:
      return state
  }
}

// actions
export const setItems = (data: ItemType[]) =>
  ({type: 'items/SET-ITEMS', payload: data} as const)
export const setQueryParams = (data: QueryParamType) =>
  ({type: 'items/SET-QUERY-PARAMS', payload: data} as const)

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
  | ReturnType<typeof setQueryParams>

export type InitialStateType = {
  items: ItemType[],
  queryParam: QueryParamType
}

export type ItemType = {
  id: string
  name: string
  data: string
  count: number
  distance: number
}
export type QueryParamType = {
  page: number
  currentPage: number
  pageSize: number
  totalCount: number
  
}