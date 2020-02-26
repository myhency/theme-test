import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import 'semantic-ui-less/semantic.less';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './utils/ScrollToTop';
import PrivateRoute from './utils/PrivateRoute';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = (props) => {

  return (
    <Router basename="/">
      <ScrollToTop>
        <div>
          <Switch>
            <Route path="/" component={MainLayout} />
          </Switch>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
