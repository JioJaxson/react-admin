import React from 'react';
import {HashRouter,Switch,Route, } from 'react-router-dom';
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
      <div className='body'>
          <h1>dnvkdf</h1>
          <ul>
            <li>的内存数据</li>
            <li>的内存数据</li>
            <li>的内存数据</li>
          </ul>
      <HashRouter>
        <Switch>
        <Route component={ Home} exact path='/' />
        <Route component={About} path='/about' />
      </Switch>
        </HashRouter>
        </div>
        
)
  }
}


export default App;
