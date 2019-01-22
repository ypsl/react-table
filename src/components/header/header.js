import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';

import './header.css';

class Header extends Component {

  render(){
    const { headers, sortToken, sortOrder, applySort, changeSortToken } = this.props;
    const headerList = headers.map((item, index) => {
      let sortIcon = null;
      if(sortToken === item.accessor){
        switch (sortOrder) {
          case 'ascending':
            sortIcon = <i className=' fas fa-sort-up'></i>
            break;
          case 'descending':
            sortIcon = <i className='fas fa-sort-down'></i>
            break;
          default:
            break;
        }
      }
      return <th 
                key = {`label${index}`}
                onClick = {
                  () => {
                    changeSortToken(item.accessor);
                    applySort(true);
                  } 
                }
              >{ item.label } {sortIcon}</th>
    })
    return(
      <thead>
        <tr className='header'>
          { headerList }
        </tr>
      </thead>
    )
  }
}

const mapStateToProps = ({ headers, sortToken, sortOrder }) => {
  return{
    headers,
    sortToken,
    sortOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  const { changeSortToken, applySort } = bindActionCreators(actions, dispatch);
  return{
    changeSortToken: (token) => changeSortToken(token),
    applySort: (bool) => applySort(bool)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);