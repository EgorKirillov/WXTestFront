import React, {ChangeEvent, FormEvent, SyntheticEvent, useState} from 'react';

import {ColumnSortNames, changeQueryParams, ColumnFilterNames, clearFilter} from "../../itemsReducer";
import {useAppDispatch} from "../../../../common/hooks/hooks";
import {createFilterQueryParams} from "../../../../common/utils/createQueryParams";

import styles from './filter.module.css'

export type MethodType = 'none' | '=' | 'included' | '>' | '<'

export const Filter = () => {
  
  const [filterName, setFilterName] = useState<ColumnFilterNames | 'none'>('none')
  const [method, setMethod] = useState<MethodType>("none")
  const [filterValue, setFilterValue] = useState("")
  const [timerId, setTimerId] = useState(0)
  
  const dispatch = useAppDispatch()
  
  const filterNames: (ColumnFilterNames | 'none')[] = ['none', 'name', 'count', 'distance', 'date']
  
  //определение методов фильтрации в зависимости от сортируемого столбца
  let filterMethods: MethodType[]
  if (filterName !== 'name') {
    filterMethods = ['none', '=', '>', '<']
  } else {
    filterMethods = ['none', '=', 'included']
  }
  
  
  // выбор имени колонки по которой производится фильтрация
  const selectName = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
    //обнуляем  метода и значения фильтрации если они не 'пустые' (изменение столбца фильтрации)
    if (method !== "none") setMethod("none")
    if (filterValue !== "") setFilterValue("")
    
    setFilterName(e.currentTarget.value as ColumnSortNames)
  }
  
  //выбор способа фильтрации
  const selectMethod = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
    //обнуляем значение фильтрации если оно не 'пустое' (изменение метода фильтрации)
    setFilterValue('')
    setMethod(e.currentTarget.value as MethodType)
  }
  
  //ввод значения фильтрации и отправка в стэйт данных через 1с после остановки ввода debounсing
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value)
    const val = e.currentTarget.value
    //если происходит ввод данных - очистить предыдущий таймер
    clearTimeout(timerId)
    const id = +setTimeout(() => {
      const filterParam = filterName !== 'none' ? createFilterQueryParams(filterName, method, val) : {}
      dispatch(changeQueryParams(filterParam))
    }, 1000)
    setTimerId(id)
  }
  
  //очистка фильтрации
  const clearFilterHandler = (e: FormEvent) => {
    e.preventDefault()
    setFilterName('none')
    setMethod('none')
    setFilterValue("")
    dispatch(clearFilter())
  }
  
  //отпределение типа input для ввода значений фильтрации
  const inputType =
    filterName === 'name'
      ? 'text'
      : filterName === 'date'
        ? 'date'
        : 'number'
  
  
  return (
      <form className={styles.filterForm}>
        <div>
          <span>SELECT filter column</span>
          <select name="column" placeholder={'filter by column'} value={filterName} onChange={selectName}>
            
            {filterNames.map(name =>
              <option value={name} key={name}>{name.toUpperCase()}</option>)
            }
          </ select>
        </div>
        
        {/*отрисовка только если выбрана колонка фильтрации*/}
        {filterName !== 'none' &&
            <div>
                <span>method</span>
                <select name="method" placeholder={'filter by column'} onChange={selectMethod}>
                  {filterMethods.map(filterMethod =>
                    <option value={filterMethod} key={filterMethod}>{filterMethod.toUpperCase()}</option>)
                  }
                </ select>
            </div>}
        
        {/*отрисовка только если выбрана колонка фильтрации и метод фильтрации*/}
        {filterName !== 'none' && method !== 'none' &&
            <div>
                <span>value</span>
                <input type={inputType} onChange={changeInput} value={filterValue}/>
            </div>}
        
        <button type={"submit"} onClick={clearFilterHandler}>clear filter</button>
        
      </form>
  );
};

