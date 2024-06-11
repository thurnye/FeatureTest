import React from 'react';
import ReactDOM from 'react-dom';
import Google from './Google';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Google />, div);
  ReactDOM.unmountComponentAtNode(div);
});