import {ColumnFilterMethod, ColumnFilterNames, QueryParamType} from "../../features/table/itemsReducer";
import {MethodType} from "../../features/table/UI/filter/filter";

//утилитная функция по преобразования данных фильтрации в параметры state
export const createFilterQueryParams = (name: ColumnFilterNames, method: MethodType, value: string | number): QueryParamType => {
  let filterMethod = 'none'
  
  switch (method) {
    case "<": {
      filterMethod = 'lower'
      break
    }
    case ">": {
      filterMethod = 'more'
      break
    }
    case "=": {
      filterMethod = 'equal'
      break
    }
    case "included": {
      filterMethod = 'includes'
      break
      
    }
  }
  
  return {
    filterTitle: name,
    filterMethod:filterMethod as ColumnFilterMethod,
    filterValue: value
  }
  
}