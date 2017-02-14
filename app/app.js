import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import store from "./store"
import injectTapEventPlugin from 'react-tap-event-plugin';
import './components/styles/styles.css';
import Layout from './components/Layout.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

injectTapEventPlugin();

ReactDOM.render(<MuiThemeProvider muiTheme = {muiTheme}>
  <Provider store={store}>
  <div class="wrapper">
  <Layout/>
  </div>
  </Provider>
  </MuiThemeProvider>, document.getElementById('app'));
