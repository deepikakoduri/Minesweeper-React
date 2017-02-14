import React from 'react';
import ReactDOM from 'react-dom';
import * as cellStyle from './styles/styles.css';
import Playground from './Playground.js';
import Counter from './Counter.js';
import Status from './Status.js';
import Timer from './Timer.js';
import Reset from './Reset.js';
import Specs from './Specs.js';

export default class Layout extends React.Component {
  render(){
    return(
  <div>
    <table>
    <tbody>
      <tr>
        <td>
          <div class="parent border">
            <Counter/>
            <Status/>
            <Timer/>
          </div>
        </td>
      </tr>
      <tr>
        <td class="border">
          <Playground/>
        </td>
      </tr>
      <tr>
        <td>
          <div class="footer">
            <Reset/>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <Specs/>
        </td>
      </tr>
    </tbody>
    </table>
    </div>
    )
  }
}
