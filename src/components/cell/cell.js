import React, { Component } from 'react';

import './cell.css';

export default class Cell extends Component {
  makeEditable(){
    const el = this.refs['td'];
    el.setAttribute('contenteditable', true);
    el.classList.add('editable');
  }
  makeStatic(){
    const el = this.refs['td'];
    el.setAttribute('contenteditable', false);
    el.classList.remove('editable');
  }
  onKeyDown(e){
    if(e.key === 'Enter'){
      const { accessor, cellContentChanged } = this.props;

      const el = this.refs['td'];
      let str = el.textContent;
      str = str.trim();
      el.textContent = str;

      cellContentChanged({
        accessor,
        text: str
      });

      this.makeStatic();
    }
  }
  render(){
    const { text } = this.props;
    return (
      <td 
        ref='td'
        onKeyDown={(e) => this.onKeyDown(e)}
        onDoubleClick={() => this.makeEditable()}
        onBlur={() => {this.makeStatic()}}
      >{ text }</td>
    )
  }
}