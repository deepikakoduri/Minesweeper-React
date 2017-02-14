import React from 'react';
import * as cellStyle from './styles/styles.css';
import { connect } from "react-redux";
import * as constants from '../constants.json';

@connect(
  state => ({
    Play: state.Play
  })
)

export default class Status extends React.Component{
  render(){
      let {Play} = this.props;
      let status_smiley = Play.gameOver ? (Play.result ? constants.won : constants.lost) : constants.playing
      return(
        <div class="status">
            {status_smiley}
        </div>
      )
  }
}
