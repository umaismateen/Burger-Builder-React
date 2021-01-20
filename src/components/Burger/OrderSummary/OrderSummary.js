import React from 'react';

import Aux from '../../../hoc/Auxiliry/Auxiliry';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary =Object.keys(props.ingredients).map(igKey=>{
        return (
            <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <ul>
            {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
        </Aux>
    );    
}

export default orderSummary;