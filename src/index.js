import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import data from './data/fixtures';

ReactDOM.render(<App data={data} />, document.getElementById('root'));
