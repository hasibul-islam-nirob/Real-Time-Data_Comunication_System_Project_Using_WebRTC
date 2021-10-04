import React from 'react';
import ReactDOM from 'react-dom';
import MeetingPage from './Pages/MeetingPage';
import WaitingPage from './Pages/WaitingPage';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

import './Assets/css/bootstrap.min.css';
import './Assets/css/style.css';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Switch>
              <Route exact path="/meeting" component={MeetingPage} />
              <Route exact path="/" component={WaitingPage} />
          </Switch>
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

