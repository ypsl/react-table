const initialState = {
  headers: [
    {
      label: 'Name',
      accessor: 'name'
    },
    {
      label: 'Company',
      accessor: 'company'
    },
    {
      label: 'Age',
      accessor: 'age'
    },
    {
      label: 'Gender',
      accessor: 'gender'
    },
    {
      label: 'Eye color',
      accessor: 'eyeColor'
    },
    {
      label: 'Phone',
      accessor: 'phone'
    },
    {
      label: 'Email',
      accessor: 'email'
    },
    {
      label: 'Address',
      accessor: 'address'
    }
  ],
  sortToken: '',
  sortOrder: '',
  isSorting: false,
  tableData: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_TABLE_DATA': 
      return{
        ...state,
        tableData: action.payload
      }
    case 'CHANGE_SORT_TOKEN': 
      return{
        ...state,
        sortToken: action.payload
      }
    case 'CHANGE_SORT_ORDER': 
      return{
        ...state,
        sortOrder: action.payload
      }
    case 'APPLY_SORT':
      return{
        ...state,
        isSorting: action.payload
      }
    default:
      return state;
  }
}

export default reducer;