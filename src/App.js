import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import 'semantic-ui-less/semantic.less';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './utils/ScrollToTop';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from './pages/NotFound';

const App = (props) => {

  return (
    <Router basename="/">
      <ScrollToTop>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home/overview"/>}/> 
            <Route path="/home" component={MainLayout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
