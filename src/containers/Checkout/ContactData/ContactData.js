import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderFrom: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '5 Digit ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,


    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElement in this.state.orderFrom) {
            formData[formElement] = this.state.orderFrom[formElement].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,  
            userId: this.props.userId,
        };
        this.props.onOrderBurger(order, this.props.token);


    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }


        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updateOrderForm = { ...this.state.orderFrom };
        const updateFormElement = { ...updateOrderForm[inputIdentifier] };
        updateFormElement.value = event.target.value;
        updateFormElement.touched = true;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateOrderForm[inputIdentifier] = updateFormElement;

        let formisValid = true;
        for (let inputIdentifier in updateOrderForm) {
            formisValid = updateOrderForm[inputIdentifier].valid && formisValid;
        }

        this.setState({ orderFrom: updateOrderForm, formIsValid: formisValid });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderFrom) {
            formElementsArray.push({
                id: key,
                config: this.state.orderFrom[key],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        elementType={formElement.config.elementType} />
                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
       userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));  