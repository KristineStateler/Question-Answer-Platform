import React from 'react';
import FAQContainer from './FAQContainer';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import LauncherList from '../components/LauncherList';
import LauncherContainer from './LauncherContainer'


const App = props => {

  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={FAQContainer} />
        <Route path="/launchers" component={LauncherList} />
        <Route path="/launchers/:id" component={LauncherContainer} />
        </Router>
    </div>

  )
}

export default App;
