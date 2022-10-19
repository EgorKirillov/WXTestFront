import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppStatusActionType, appStatusReducer} from './appStatusReducer';
import {ItemsActionsType, itemsReducer} from "../features/table/itemsReducer";


// объединяем рутовый Reducer
const rootReducer = combineReducers({
  
  items: itemsReducer,
  app: appStatusReducer,
})

export const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
)

// Общий State Type
export type AppRootStateType = ReturnType<typeof store.getState>

// Общий Action Type
export type AppActionType =
  | ItemsActionsType
  | AppStatusActionType

// типизация Dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>

// типизация Thunk Action для всего объекта
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

