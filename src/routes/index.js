import React, {Component} from 'react';
import {Route, Redirect, Match, Switch} from 'react-router-dom';

import List from 'views/List';
import Content from 'views/Content';
import Detail from 'views/Detail';
import Welcome from 'views/Welcome';
import CoreLayout from '../layout/CoreLayout';
import NotFound from './NotFound';
import LazyRoute from '../components/LazyRoute';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {store} = this.props;
    return (
      <CoreLayout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/detail" component={Detail(store)}/>

          <LazyRoute
            component={Welcome}
            store={store}
            path="/inject"
          />

          <LazyRoute
            component={() => import(/* webpackChunkName: "asyc" */ './Async')}
            store={store}
            path="/async-componet"
          />

          <Route path="/list" render={(props) =>
            <List {...props}>
              <Switch>
                <Route path="/list/content" component={Content}/>
                <LazyRoute
                  component={Welcome}
                  store={store}
                  path="/list/welcome"
                />
                <Redirect from="/list" to="/list/content"/>
              </Switch>
            </List>
          }/>
          <Route component={NotFound}/>
        </Switch>
      </CoreLayout>
    );
  }
}

export default App;
