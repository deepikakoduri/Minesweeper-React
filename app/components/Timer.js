import React from 'react';
import { connect } from "react-redux";
import * as cellStyle from './styles/styles.css';

@connect(
  state => ({
    Play: state.Play
  })
)

export default class Timer extends React.Component{
  render(){
      let {Play} = this.props;
      return(
        <div class="child">
          <div class="stat">
            <div>{Play.timer}</div>
            <span>TIME</span>
          </div>
        </div>
      )
  }
}
