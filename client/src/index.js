import React from 'react';
import ReactDOM from 'react-dom';
import MeetingPage from './Pages/MeetingPage';
import WaitingPage from './Pages/WaitingPage';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

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

