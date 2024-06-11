import React from 'react';
import ReactDOM from 'react-dom';
import GoogleCloudVisionPro from './GoogleCloudVisionPro';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GoogleCloudVisionPro />, div);
  ReactDOM.unmountComponentAtNode(div);
});