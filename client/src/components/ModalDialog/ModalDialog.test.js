import React from 'react';
import ReactDOM from 'react-dom';
import ModalDialog from './ModalDialog';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalDialog />, div);
  ReactDOM.unmountComponentAtNode(div);
});