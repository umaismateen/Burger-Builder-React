import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
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
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'},
                   ]
                },
                value: 'fastest',
                validation:{},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData={};
        for (let formElement in this.state.orderFrom ){
            formData[formElement] = this.state.orderFrom[formElement].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false, });
            });


    }

    checkValidity(value,rules){
        let isValid=true;
        if (rules.required) {
            isValid= value.trim() !=='' &&isValid;
        }

        if(rules.minLength) {
            isValid=value.length>=rules.minLength&&isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }


        return isValid;
    }

    inputChangeHandler=(event,inputIdentifier)=>{
        const updateOrderForm = { ...this.state.orderFrom};
        const updateFormElement ={...updateOrderForm[inputIdentifier]};
        updateFormElement.value=event.target.value;
        updateFormElement.touched=true;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateOrderForm[inputIdentifier]=updateFormElement;

        let formisValid =true;
        for ( let inputIdentifier in updateOrderForm){
            formisValid= updateOrderForm[inputIdentifier].valid && formisValid;
        }

        this.setState({orderFrom: updateOrderForm,formIsValid:formisValid});
    }

    render() {

        const formElementsArray =[];
        for (let key in this.state.orderFrom){
            formElementsArray.push({
                id: key,
                config: this.state.orderFrom[key],
            });
        }

        let form = (   
            <form onSubmit= { this.orderHandler }>
                 {formElementsArray.map(fromElement=>(
                     <Input 
                         key={fromElement.id}
                         changed={(event)=>this.inputChangeHandler(event,fromElement.id)}
                         invalid={!fromElement.config.valid}
                         touched={fromElement.config.touched}
                         shouldValidate={fromElement.config.validation}
                         elementConfig={fromElement.config.elementConfig}
                         value={fromElement.config.value}
                         elementType={fromElement.config.elementType} />
                 ))}
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;  