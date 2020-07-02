import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import Posts from './posts/Posts';
import PostDetail from './posts/PostDetail';
import AccountDetail from './accounts/AccountDetail'
import CommentDetail from './comments/CommentDetail'
import FileDetail from './files/FileDetail'


import PostCreate from './posts/PostCreate'

import Accounts from './accounts/Accounts'
import RegisterC from './comments/Register'
import Comments from './comments/Comments'

import RegisterF from './files/Register'
import Files from './files/Files'


import Register from './accounts/Register'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/files' component={Files}/>
            <Route exact path='/files/register' component={RegisterF}/>
            <Route exact path='/files/:slug' component={FileDetail}/>
            <Route exact path='/comments' component={Comments}/>
            <Route exact path='/comments/register' component={RegisterC}/>
            <Route exact path='/comments/:slug' component={CommentDetail}/>
            <Route exact path='/accounts' component={Accounts}/>
            <Route exact path='/accounts/register' component={Register}/>
            <Route exact path='/accounts/:slug' component={AccountDetail}/>
            <Route exact path='/posts/create' component={PostCreate}/>
            <Route exact path='/posts' component={Posts}/>
            <Route exact path='/posts/:slug' component={PostDetail}/>
            <Route component={Posts}/>
            
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;