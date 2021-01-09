import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <BurgerBuilder />
        </div>
      </Layout>
    );
  }
}

export default App;
