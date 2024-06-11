import React from 'react';
import ReactDOM from 'react-dom';
import ForgotPassword from './ForgotPassword';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForgotPassword />, div);
  ReactDOM.unmountComponentAtNode(div);
});