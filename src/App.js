import React from 'react';
import {HashRouter,Switch,Route, } from 'react-router-dom';
// 引用组件
import Login from './views/login/index'
import Index from './views/index/Index'

// 无状态组件
class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (        
      <HashRouter>
        <Switch>
        <Route exact component={Login} path='/' />
        <Route exact  component={Index} path='/index' />
      </Switch>
      </HashRouter>
        
)
  }
}


export default App;
