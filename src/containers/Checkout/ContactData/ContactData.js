import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/index';

const contactData = props => {
      
   const [orderForm,setOrderForm] = useState({
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
        })


    const [formIsValid, setFormIsValid] = useState( false );

    
    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElement in orderForm) {
            formData[formElement] = orderForm[formElement].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,  
            userId: props.userId,
        };
        props.onOrderBurger(order, props.token);


    }

   const checkValidity = (value, rules)=> {
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

 const inputChangeHandler = (event, inputIdentifier) => {
        const updateOrderForm = { ...orderForm };
        const updateFormElement = { ...updateOrderForm[inputIdentifier] };
        updateFormElement.value = event.target.value;
        updateFormElement.touched = true;
        updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.validation);
        updateOrderForm[inputIdentifier] = updateFormElement;

        let formisValid = true;
        for (let inputIdentifier in updateOrderForm) {
            formisValid = updateOrderForm[inputIdentifier].valid && formisValid;
        }
        setOrderForm(updateOrderForm);
        setFormIsValid(formisValid);

    }


        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key],
            });
        }

        let form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        changed={(event) => inputChangeHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        elementType={formElement.config.elementType} />
                ))}
                <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if (props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    
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


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));  