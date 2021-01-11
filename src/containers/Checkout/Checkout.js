import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients={};
        let totalPrice =0;
        for (let param of query.entries()){
            console.log(param);
            if(param[0]==='price'){
                totalPrice=param[1];
            }else{
            ingredients[param[0]]=+param[1];
            }
        }
        this.setState({ingredients:ingredients,price:totalPrice});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
            <CheckoutSummary
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}
                ingredients={this.state.ingredients} />
            <Route path={this.props.match.path+'/contact-data'} render={(props)=>(
            <ContactData {...props} ingredients={this.state.ingredients} price={this.state.price}/>
            )} />
            </div>    
        );
    }
}
export default Checkout;