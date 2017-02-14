export default function reducer(state = {
    cells: [],
    bombsLeft: 4,
    rows: 4,
    cols: 4,
    bombs: 4,
    rowstext: 4,
    colstext: 4,
    bombstext: 4,
    gameOver: false,
    result: false,
    gameStarted: false,
    timer: 0
},
action){
    switch (action.type) {

    case "SET_ROWS":
        state = Object.assign({}, state , {rowstext: action.payload});
        break;

    case "SET_COLUMNS":
        state = Object.assign({}, state , {colstext: action.payload});
        break;

    case "SET_BOMBS":
        state = Object.assign({}, state , {bombstext: action.payload});
        break;

    case "GAME_STARTED":
        state = Object.assign({}, state , {gameStarted: true});
        break;

    case "INCREMENT_TIMER":
        state = Object.assign({}, state , {timer: state.timer + 1});
        break;

    case "RESET":
        let bombs = state.bombstext;
        let rows = state.rowstext;
        let cols = state.colstext;
        if(bombs > rows*cols){
            alert("#bombs greater than #available cells");
            return state;
        }
        if(rows > 7 || cols > 7){
            alert("#rows and #cols shouldn't be greater than 7");
            return state;
        }
        state = Object.assign({}, state , {rows: state.rowstext, cols: state.colstext, bombs: state.bombstext, bombsLeft: state.bombstext});
        break;

    case "INIT":
        state = Object.assign({}, state , {cells: action.payload, bombsLeft: state.bombs, gameOver: false, result: false, gameStarted: false, timer: 0});
        break;

    case "REVEAL":
        state = Object.assign({},state,{cells: action.payload});
        break;

    case "TOGGLE_MARK":
        let remaining = state.bombsLeft-action.payload.dec;
        remaining = remaining<0 ? 0 : remaining;
        remaining = remaining>state.bombs ? state.bombs : remaining;
        state = Object.assign({},state,{cells: action.payload.field, bombsLeft: remaining});
        break;

    case "WON":
        state = Object.assign({},state,{bombsLeft: 0, gameOver: true, result: true, gameStarted:false});
        alert("Congratulations");
        break;

    case "LOST":
        state = Object.assign({},state,{cells: action.payload, gameOver: true,result: false});
        break;
    }
  return state;
}
