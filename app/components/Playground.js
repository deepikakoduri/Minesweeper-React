import React from 'react';
import * as cellStyle from './styles/styles.css';
import * as constants from '../constants.json';
import { Init, Reveal, ToggleMark, RevealAll } from '../actions/PlayAction.js';
import { connect } from "react-redux";

@connect(
  state => ({
    Play: state.Play
  })
)

export default class Playground extends React.Component {

  componentWillMount(){
    let {Play} = this.props
    this.props.dispatch(Init(Play.rows,Play.cols,Play.bombs));
  }

  handleClick(i,j,field,e){
    let {Play} = this.props;
    if(field[i][j].value == constants.bomb){
      this.props.dispatch(RevealAll(field));
    }
    else{
      this.props.dispatch(Reveal(i,j,field,Play.gameStarted,Play.bombs));
    }
  }

  handleContextMenu(i,j,field,e){
    e.preventDefault();
    this.props.dispatch(ToggleMark(i,j,field));
  }

  createPlayground(rowno,collno){
    let {Play} = this.props;
    let rows=[];
    for(let i=0;i<rowno;i++){
        let row = [];
        for(let j=0;j<collno;j++){
          if(Play.cells[i] && Play.cells[i][j]){
            let isrevealed = Play.cells[i][j].isrevealed;
            let style = isrevealed ? "cell unmasked" : "cell masked";
            let value = isrevealed ? (Play.cells[i][j].value !=0 ? Play.cells[i][j].value :"" ): (Play.cells[i][j].ismarked ? constants.marked : "");
            let cell = <div className={style} key={j}
            onClick={this.handleClick.bind(this,i,j,Play.cells)}
            onContextMenu={this.handleContextMenu.bind(this,i,j,Play.cells)}>
            <span>{value}</span></div>
            row.push(cell);
          }
        }
        let oneRow = <div className="row" key={i}>{row}</div>;
        rows.push(oneRow);
    }
    return rows;
  }

  render(){
    let {Play} = this.props;
    return(
    <div>
        {this.createPlayground(Play.rows,Play.cols)}
    </div>
    )
  };
}
