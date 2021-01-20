import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

const checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to="/" />

    if (props.ings) {

        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (<div>
            {purchasedRedirect}
            <CheckoutSummary
                checkoutContinued={checkoutContinuedHandler}
                checkoutCancelled={checkoutCancelledHandler}
                ingredients={props.ings} />
            <Route path={props.match.path + '/contact-data'}
                component={ContactData} />
        </div>
        );
    }
    return summary;

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
}



export default connect(mapStateToProps)(checkout);

