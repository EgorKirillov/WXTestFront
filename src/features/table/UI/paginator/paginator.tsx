import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {changeQueryParams} from "../../itemsReducer";
import styles from "./paginator.module.css"

export const Paginator = () => {
  const currentPage = useAppSelector(state => state.items.queryParam.currentPage) || 1
  const pageSize = useAppSelector(state => state.items.queryParam.pageSize) || 4
  const totalCount = useAppSelector(state => state.items.queryParam.totalCount) || 5
  const totalPagesCount = Math.ceil(totalCount / pageSize)
  const dispatch = useAppDispatch()
  
  
  //создание пустого массива-пагинатора
  const pages = []
  for (let i = 1; i < totalPagesCount + 1; i++) {
    pages.push(i)
  }
  //изменение текущей страницы
  const onChangeCurrentPage = (page: number) => {
    dispatch(changeQueryParams({currentPage: page}))
  }
  
  //изменение количества элементов на странице
  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.currentTarget.value)
    //изменение количества на странице и одновременный переход на первую страницу
    dispatch(changeQueryParams({pageSize: newPageSize, currentPage: 1}))
  }
  
  return (
    <div className={styles.paginator}>
      {pages.map(p => {
        if (Math.abs(p - currentPage) < 3 || p === totalPagesCount || p === 1) {
          return <span onClick={() => onChangeCurrentPage(p)}
                       style={currentPage === p ? {color: 'firebrick', fontSize: '120%', padding: "0 10px"} : {}}
          >
              {`   ${p}   `}
           </span>
        } else if (Math.abs(p - currentPage) < 5) {
          return <span>..</span>
        } else return ""
      })
      }
      <select name="pageSize" value={pageSize} onChange={onChangePageSize}>
        <option value={4} selected={pageSize === 4}>4</option>
        <option value={8} selected={pageSize === 8}>8</option>
        <option value={16} selected={pageSize === 16}>16</option>
      </ select>
    </div>
  );
};

