import React from 'react';
import * as cellStyle from './styles/styles.css';
import { connect } from "react-redux";
import * as constants from '../constants.json';
import {setRows, setColumns, setBombs} from '../actions/PlayAction';

@connect(
  state => ({
    Play: state.Play
  })
)

export default class Specs extends React.Component{

  handleRowsChange(e){
      let value = e.target.value;
      this.props.dispatch(setRows(value));
  }

  handleColumnsChange(e){
      let value = e.target.value;
      this.props.dispatch(setColumns(value));
  }

  handleBombsChange(e){
      let value = e.target.value
      this.props.dispatch(setBombs(value));
  }

  render(){
      let {Play} = this.props
      return(
        <table>
        <tbody>
        <tr>
          <td>
            rows
          </td>
          <td>
            <input type = "text" onChange = {this.handleRowsChange.bind(this)} />
          </td>
        </tr>
        <tr>
          <td>
            columns
          </td>
          <td>
            <input type = "text" onChange = {this.handleColumnsChange.bind(this)} />
          </td>
        </tr>
        <tr>
          <td>
            bombs
          </td>
          <td>
            <input type = "text" onChange = {this.handleBombsChange.bind(this)} />
          </td>
        </tr>
        </tbody>
        </table>
      )
  }
}
