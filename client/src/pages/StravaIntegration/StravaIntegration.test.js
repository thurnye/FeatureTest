import React from 'react';
import ReactDOM from 'react-dom';
import StravaIntegration from './StravaIntegration';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StravaIntegration />, div);
  ReactDOM.unmountComponentAtNode(div);
});