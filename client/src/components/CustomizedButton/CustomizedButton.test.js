import React from 'react';
import ReactDOM from 'react-dom';
import CustomizedButton from './CustomizedButton';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomizedButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});