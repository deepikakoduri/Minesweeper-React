import React from 'react';
import * as cellStyle from './styles/styles.css';
import { connect } from "react-redux";
import {Restart, Init} from "../actions/PlayAction";

@connect(
  state => ({
    Play: state.Play
  })
)

export default class Reset extends React.Component{

  restart(){
    let {Play} = this.props;
    this.props.dispatch(Restart());
    this.props.dispatch(Init(Play.rowstext,Play.colstext,Play.bombstext));
  }

  render(){
      return(
        <div class="reset">
            <div onClick = {this.restart.bind(this)}>RESET</div>
        </div>
      )
  }
}
