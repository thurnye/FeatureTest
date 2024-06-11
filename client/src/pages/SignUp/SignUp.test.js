import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignUp />, div);
  ReactDOM.unmountComponentAtNode(div);
});