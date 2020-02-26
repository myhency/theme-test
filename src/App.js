import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import 'semantic-ui-less/semantic.less';
import OverviewLayout from './layouts/OverviewLayout';
import ScrollToTop from './utils/ScrollToTop';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = (props) => {
  const { isLoading } = props;

  return (
    <Router basename="/">
      <ScrollToTop>
        <div>
          <OverviewLayout />
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
