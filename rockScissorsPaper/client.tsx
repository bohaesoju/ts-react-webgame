import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import RockScissorsPaper from './RockScissorsPaper';

const Hot = hot(RockScissorsPaper) //hoc

ReactDOM.render(<Hot />, document.querySelector('#root'));