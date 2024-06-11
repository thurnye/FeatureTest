import React from 'react';
import ReactDOM from 'react-dom';
import AppleWellnessIntegration from './AppleWellnessIntegration';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppleWellnessIntegration />, div);
  ReactDOM.unmountComponentAtNode(div);
});