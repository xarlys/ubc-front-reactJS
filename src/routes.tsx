import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import PropertiesMap from './pages/PropertiesMap';
import Propertie from './pages/Propertie';
import CreatePropertie from './pages/CreatePropertie';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={PropertiesMap} />
        
        <Route path="/properties/create" component={CreatePropertie} />
        <Route path="/properties/:id" component={Propertie} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;