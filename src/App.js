import React from 'react';
import {HashRouter,Switch,Route, } from 'react-router-dom';
import './App.scss';
// 引用组件
import Home from './views/Home'
import About from './views/About'
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
        
          <Route component={ Home} exact path='/' />
          <Route component={About} path='/about' />
        </Switch>
</HashRouter>
)
  }
}


export default App;
