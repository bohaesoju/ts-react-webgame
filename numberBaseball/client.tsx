import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import numberBaseball from './numberBaseball';

const HOT = hot(numberBaseball);

ReactDOM.render(<HOT />, document.querySelector('#root'));