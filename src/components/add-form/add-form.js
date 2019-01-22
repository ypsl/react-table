import React, { Component } from 'react';
import { connect } from 'react-redux';

import './add-form.css';

class AddForm extends Component {
  state = {

  }

  componentWillMount(){
    const { headers } = this.props;
    headers.forEach(header => {
      this.setState({
        [header['accessor']]: ""
      })
    });
  }

  send(){
    this.props.createRow(this.state);
  }

  onInputChange(e, accessor){
    const value = e.target.value;
    this.setState({
      [accessor]: value
    });
  }

  render(){
    const { headers, toggleVisibility } = this.props;
    const formItems = headers.map((header, index) => {
      const { accessor } = header;
      return(
        <div className="form-group" key={`formItem${index}`}>
          <label>{header['label']}</label>
          <input 
            className="form-control"
            onChange={(e) => {this.onInputChange(e, accessor)}}
          ></input>
        </div>
      )
    });
    return(
      <div className="add-form">
        <div className="add-form-content">
          <div className="add-form-container">
            <h4>Введите данные для новой записи</h4>
            { formItems }
            <div className="btn-group">
              <button type="button" className="btn btn-success"
                onClick={() => {this.send()}}
              >Отправить</button>
              <button type="button" className="btn btn-danger"
                onClick={toggleVisibility}
              >Отмена</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ headers }) => {
  return{
    headers
  }
}

export default connect(mapStateToProps)(AddForm);