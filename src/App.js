import React, { Component } from 'react';
import { Route, Switch, withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
});
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
});
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
});


class App extends Component {

  componentDidMount() {
    this.props.onAutoSignUp();
  }

  render() {

    return (
      <Layout>
        <div>
          <Switch>
            {!this.props.isAuthenticated ? <Route path="/auth" component={asyncAuth} /> : null}
            <Route path="/checkout" component={asyncCheckout} />
           {this.props.isAuthenticated ? <Route path="/orders" component={asyncOrders} /> :null }
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch >
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
