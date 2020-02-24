import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-less/semantic.less';
import HeaderMenu from './HeaderMenu';
import ErrorBoard from './ErrorBoard';
import OverviewLayout from './OverviewLayout';

function App() {
  return (
    <div>
      <OverviewLayout />
    </div>
  );
}

export default App;
