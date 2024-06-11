import React from 'react';
import ReactDOM from 'react-dom';
import ViewAll from './ViewAll';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewAll />, div);
  ReactDOM.unmountComponentAtNode(div);
});