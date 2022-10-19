
const initialState: InitialStateType = {
  isInitialize: false,
  status: 'idle',
  error: null,
}

// reducer
export const appStatusReducer = (state: InitialStateType = initialState, action: AppStatusActionType) => {
  switch (action.type) {
    case 'app/SET-INITIALIZE':
      return {...state, isInitialize: action.payload.value}
    case 'app/SET-STATUS-LOADING':
      return {...state, status: action.payload.status}
    case 'app/SET-ERROR':
      return {...state, error: action.payload.errorValue}
    
    default:
      return state
  }
}

//action creators
export const setIsInitialize = (value: boolean) => {
  return {
    type: 'app/SET-INITIALIZE',
    payload: {value},
  } as const
}

export const setStatusLoading = (status: RequestStatusType) => {
  return {
    type: 'app/SET-STATUS-LOADING',
    payload: {status},
  } as const
}

export const setError = (errorValue: string | null) => {
  return {
    type: 'app/SET-ERROR',
    payload: {errorValue},
  } as const
}


//type
export type InitialStateType = {
  status: RequestStatusType
  isInitialize: boolean
  error: null | string
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStatusActionType =
  | ReturnType<typeof setIsInitialize>
  | ReturnType<typeof setStatusLoading>
  | ReturnType<typeof setError>
