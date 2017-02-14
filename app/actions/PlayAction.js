import * as constants from "../constants.json";

let interval;

export function Init(rows,cols,bombs){

    return function(dispatch){
        let no_of_cells = rows*cols;
        let arr = new Array(no_of_cells);
        for(let i=0;i<no_of_cells;i++){
            arr[i]= i<bombs? constants.bomb : 0;
        }
        for(let i=no_of_cells-1;i>=0;i--){
            let rand=Math.floor(Math.random()*i);
            let temp = arr[i];
            arr[i] = arr[rand];
            arr[rand] = temp;
        }
        let field = new Array(rows);
        for(let i=0;i<rows;i++){
            field[i] = new Array(cols);
            for(let j=0;j<cols;j++){
                var obj = {};
                obj.value = arr[i*cols + j];
                obj.isrevealed = false;
                obj.ismarked = false;
                field[i][j]=Object.assign({},obj);
              }
        }

        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                if(field[i][j].value==constants.bomb){
                    continue;
                }
                for(let u=i-1; u<=i+1; u++){
                    for(let v=j-1; v<=j+1; v++){
                      if(u>=0 && v>=0 && u<rows && v<cols){
                      if(field[u][v].value==constants.bomb){
                          field[i][j].value = field[i][j].value+1;
                      }
                    }
                  }
                }
            }
        }

        dispatch({type : "INIT",
        payload : field
      });
    }
}

export function RevealAll(field){
  return function(dispatch){
      for(let i=0;i<field.length;i++){
          for(let j=0;j<field[i].length;j++){
              field[i][j].isrevealed=true;
          }
      }
      clearInterval(interval);
      dispatch({type : "LOST",payload: field});
  }
}

export function setRows(rows){
  return function(dispatch){
      dispatch({type : "SET_ROWS",
      payload: rows});
  }
}

export function setColumns(cols){
  return function(dispatch){
      dispatch({type : "SET_COLUMNS",
      payload: cols});
  }
}

export function setBombs(bombs){
  return function(dispatch){
      dispatch({type : "SET_BOMBS",
      payload: bombs});
  }
}

export function Restart(){
  return function(dispatch){
      clearInterval(interval);
      dispatch({type : "RESET"});
  }
}

export function ToggleMark(i,j,field){
  return function(dispatch){
      field[i][j].ismarked = !field[i][j].ismarked;
      let dec;
      if(field[i][j].ismarked){
        dec = 1;
      }
      else{
        dec = -1;
      }
      dispatch({type : "TOGGLE_MARK",
      payload : {
        field: field,
        dec: dec
      }
    });
  }
}

export function Reveal(i,j,field,gameStarted,bombs){
  return function(dispatch){
      if(!gameStarted){
          dispatch({type: "GAME_STARTED"});
          interval = setInterval(function(){
              dispatch({type: "INCREMENT_TIMER"});
          },1000);
      }
      field = revealCell(field,i,j);
      dispatch({type : "REVEAL",
      payload: field
      });
      let left = cellsLeft(field);
      if(left == bombs){
          clearInterval(interval);
          dispatch({type : "WON",
          payload: left});
      }
  }
}

//graph traversal - dfs
function revealCell(field,i,j){
    let temparr =[];
    temparr.push({i:i,j:j});
    while(temparr.length!=0){
        let e = temparr.pop();
        field[e.i][e.j].isvisited = true;
        if(!field[e.i][e.j].ismarked && !field[e.i][e.j].isrevealed){
            field[e.i][e.j].isrevealed = true;
            if(field[e.i][e.j].value==0){
                for(let u=e.i-1; u<e.i+1; u++){
                  for(let v=e.j-1; v<=e.j+1; v++){
                    if(u>=0 && v>=0 && u<field.length && v<field[0].length){
                      if(!field[u][v].isvisited){
                        temparr.push({i:u,j:v});
                      }
                    }
                }
              }
          }
      }
}
return field;
}

function cellsLeft(field){
    let count = 0;
    for(let i=0;i<field.length;i++){
        for(let j=0;j<field[i].length;j++){
            if(!field[i][j].isrevealed){
              count++;
            }
        }
    }
  return count;
}
