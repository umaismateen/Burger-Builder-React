import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
});


const app = props => {

  const { onAutoSignUp } = props;
  useEffect(() => {
    onAutoSignUp();
  }, [onAutoSignUp]);

  return (
    <Layout>
      <div>
        <Suspense fallback={<p>LOADING...</p>} >
          <Switch>
            <Route path="/checkout" render={(props) => <Checkout {...props} />} />
            <Route path="/orders" render={(props) => <Orders {...props} />} />
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch >
        </Suspense>
      </div>
    </Layout>
  );

}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(app));
