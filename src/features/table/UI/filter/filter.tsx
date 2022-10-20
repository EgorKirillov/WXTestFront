import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {ColumnSortNames, changeQueryParams, ColumnFilterNames} from "../../itemsReducer";
import {useAppDispatch} from "../../../../common/hooks/hooks";
import {createFilterQueryParams} from "../../../../common/utils/createQueryParams";
import styles from './filter.module.css'

export type MethodType = 'none' | '=' | 'included' | '>' | '<'

enum FilterNamesEnum {'name' = 1, 'count', 'distance', 'date'}

enum FilterMethodEnum {'none', '=', 'included', '>', '<'}

export const Filter = () => {
  const [name, setName] = useState<ColumnFilterNames | undefined>(undefined)
  const [method, setMethod] = useState<MethodType>("none")
  const [filterValue, setFilterValue] = useState("")
  const [timerId, setTimerId] = useState(0)
  
  const dispatch = useAppDispatch()
  
  const filterNames: ColumnFilterNames[] = ['name', 'count', 'distance', 'date']
  const filterMethod: MethodType[] = ['none', '=', 'included', '>', '<']
  
  // выбор имени колонки по которой производится фильтрация
  const selectName = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
    let index = e.currentTarget.options.selectedIndex
    setName(FilterNamesEnum[index] as ColumnSortNames)
  }
  
  //выбор способа фильтрации
  const selectMethod = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
    let index = e.currentTarget.options.selectedIndex
    // console.log(FilterNamesEnum[index])
    console.log(FilterMethodEnum[index])
    setMethod(FilterMethodEnum[index] as MethodType)
  }
  
  //ввод значения фильтрации и отправка в стэйт данных через 1с после остановки ввода
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value)
    const val = e.currentTarget.value
    //если происходит ввод данных - очистить предыдущий таймер
    clearTimeout(timerId)
    const id = +setTimeout(() => {
      const filterParam = name ? createFilterQueryParams(name, method, val) : {}
      console.log(filterParam)
      dispatch(changeQueryParams(filterParam))
    }, 1000)
    
    setTimerId(id)
  }
  
  const inputType =
    name === 'name'
      ? 'text'
      : name === 'date'
        ? 'date'
        : 'number'
  
  return (
    <div>
      <form className={styles.filterForm}>
        <div className={styles.filterColumn}><span>SELECT filter column</span>
          <select name="column" placeholder={'filter by column'} value={undefined} onChange={selectName}>
            <option value={"none"}> </option>
            {filterNames.map(name => <option value={name}>{name.toUpperCase()}</option>)}
          </ select></div>
        
        {name!! && < div className={styles.filterMethod}>< span>method</span>
            <select name="method" placeholder={'filter by column'} onChange={selectMethod}>
              {filterMethod.map(name => <option value={name}>{name.toUpperCase()}</option>)}
            </ select></div>}
        
        {name!! && method !== 'none' &&
            <div className={styles.filterValue}><span>value</span>
                <input type={inputType} onChange={changeInput} value={filterValue}/>
            </div>}
      </form>
    </div>
  );
};

