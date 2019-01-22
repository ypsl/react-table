import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../header';
import Row from '../row';
import LoadingSpinner from '../loading-spinner';
import { FakeService } from '../../services';
import { ascendingSortByToken as ascending, descendingSortByToken as descending } from '../../utils';
import AddForm from '../add-form';

import * as actions from '../../actions';

import './app.css';

class App extends Component{
  fakeService = new FakeService();

  state = {
    data: [],
    loading: true,
    error: false,
    isAdding: false
  }

  componentDidMount(){
    this.update();
  }

  componentDidUpdate(prevProps){
    const {
      tableData,
      applySort, 
      sortToken, 
      sortOrder,
      isSorting
    } = this.props;

    if(isSorting){
      if(sortToken !== prevProps.sortToken || sortOrder === ''){
        this.ascendingSort(sortToken);
      }
      if(sortToken === prevProps.sortToken && sortOrder === 'ascending'){
        this.descendingSort(sortToken);
      }
      if(sortToken === prevProps.sortToken && sortOrder === 'descending'){
        this.noOrderSort(tableData);
      }
      applySort(false);
    }

    if(tableData !== prevProps.tableData){
      switch (sortOrder) {
        case '':
          this.noOrderSort(tableData);
          break;
        case 'ascending':
          this.ascendingSort(sortToken);
          break;
        case 'descending':
          this.descendingSort(sortToken);
          break;
        default:
          break;
      }
    }
  }

  update(){
    this.setState({
      loading: true,
      error: false
    })
    this.fakeService.getData()
      .then(this.onSuccess)
      .catch(this.onError);
  }

  onSuccess = (data) => {
    this.setState({
      data,
      loading: false
    });

    this.props.tableDataLoaded(data);
  }

  onError = (e) => {
    this.setState({
      loading: false,
      error: true
    });
    console.log(e);
  }

  ascendingSort(sortToken){
    this.props.changeSortOrder('ascending');
    const { data } = this.state;
    const sortedData = [...data].sort(ascending(sortToken));
    this.setState({
      data: sortedData
    })
  }

  descendingSort(sortToken){
    this.props.changeSortOrder('descending');
    const { data } = this.state;
    const sortedData = [...data].sort(descending(sortToken));
    this.setState({
      data: sortedData
    })
  }

  noOrderSort(tableData){
    this.props.changeSortOrder('');
    this.setState({
      data: tableData
    })
  }

  createRow(row){
    this.fakeService.createRow(row)
    .then(() => {
      this.setState({
        isAdding: false
      })
      this.update();
    })
    .catch((e) => console.log(e));
  }

  updateRow({data, text, accessor}){
    data[accessor] = text;
    this.fakeService.updateRow(data)
    .then(() => {
      this.update();
    })
    .catch((e) => console.log(e));
  }

  deleteRow(id){
    // row_el.classList.add('delete-row');
    const bool = window.confirm(`Вы действительно хотите удалить эту запись?`);
    if(bool){
      this.fakeService.deleteRow(id)
      .then(() => {
        this.update();
      })
      .catch((e) => console.log(e));
      // .catch((e) => {console.log(e); row_el.classList.remove('delete-row')});
    }
    // else{
    //   row_el.classList.remove('delete-row');
    // }
  }

  toggleAddForm(){
    this.setState(({isAdding}) => {
      return{
        isAdding: !isAdding
      }
    })
  }

  render(){
    const { data, loading, error, isAdding } = this.state;
    const addForm = isAdding?<AddForm createRow={(row) => {this.createRow(row)}} toggleVisibility={() => {this.toggleAddForm()}}/>:null;
    const loadingSpinner = loading?<LoadingSpinner />:null;
    const errorMessage = error?<h2>Data load failed</h2>:null;
    const rows = data.map((dataItem, index) => {
      return <Row key={`row${index}`} data={dataItem} deleteRow={(id, row_el) => this.deleteRow(id, row_el)} cellContentChanged={(args) => {this.updateRow(args)}}/>
    })
    return(
      <Fragment>
        <button 
          type="button"
          className="btn btn-success m-1"
          onClick={() => {this.toggleAddForm()}}
        >Добавить запись</button>
        { addForm }
        { loadingSpinner }
        <table className="table table-bordered table-hover table-striped">
          <Header />
          <tbody>
            { rows }
          </tbody>
        </table>
        { errorMessage }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ tableData, sortToken, sortOrder, isSorting }) => {
  return{
    sortToken,
    sortOrder,
    isSorting,
    tableData: tableData
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    tableDataLoaded,
    changeSortOrder,
    applySort
  } = bindActionCreators(actions, dispatch);
  return{
    tableDataLoaded: (data) => tableDataLoaded(data),
    changeSortOrder: (order) => changeSortOrder(order),
    applySort: (bool) => applySort(bool)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);