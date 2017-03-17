import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import store from "./store"
import injectTapEventPlugin from 'react-tap-event-plugin';
import './components/styles/styles.css';
import Layout from './components/Layout.js';

injectTapEventPlugin();

ReactDOM.render(<Provider store={store}>
  <div class="wrapper">
  <Layout/>
  </div>
  </Provider>, document.getElementById('app'));
