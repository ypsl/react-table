import React, { Component } from 'react';
import Cell from '../cell';
import { connect } from 'react-redux';

import './row.css';

class Row extends Component {
  onContext(e, id){
    e.preventDefault();
    // const el = this.refs['row'];
    this.props.deleteRow(id);
  }

  render(){
    const { headers } = this.props;
    const 
    {
      data,
      cellContentChanged
    } = this.props;
    const cells = headers.map((header, index) => {
      const { accessor } = header;
      return(
        <Cell
          key={`cell${index}`}
          text={data[accessor]}
          accessor={accessor}
          cellContentChanged={({text, accessor}) => {cellContentChanged({text, accessor, data})}}
        />
      )
    })
    return(
      <tr
        ref='row'
        onContextMenu = {(e) => this.onContext(e, data['id'])}
      >
        { cells }
      </tr>
    )
  }
}

const mapStateToProps = ({ headers }) => {
  return{
    headers
  }
}

export default connect(mapStateToProps)(Row);