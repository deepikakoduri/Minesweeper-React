import React from 'react';
import * as cellStyle from './styles/styles.css';
import { connect } from "react-redux";
import * as constants from '../constants.json';

@connect(
  state => ({
    Play: state.Play
  })
)

export default class Counter extends React.Component{
  render(){
      let {Play} = this.props;
      return(
        <div class="child">
          <div class="stat">
            <div>{Play.bombsLeft}</div>
            <span>BOMBS</span>
          </div>
        </div>
      )
  }
}
