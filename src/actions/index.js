const LOAD_TABLE_DATA = 'LOAD_TABLE_DATA';
const CHANGE_SORT_TOKEN = 'CHANGE_SORT_TOKEN';
const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';
const APPLY_SORT = 'APPLY_SORT';

const tableDataLoaded = (data) => {
  return{
    type: LOAD_TABLE_DATA,
    payload: data
  }
}
const changeSortToken = (token) => {
  return{
    type: CHANGE_SORT_TOKEN,
    payload: token
  }
}
const changeSortOrder = (order) => {
  return{
    type: CHANGE_SORT_ORDER,
    payload: order
  }
}
const applySort = (bool) => {
  return{
    type: APPLY_SORT,
    payload: bool
  }
}

export{
  tableDataLoaded,
  changeSortToken,
  changeSortOrder,
  applySort
}