import React from 'react';

import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';


const burger = (props) => {
    let ingredients=[];
    if(Object.entries(props.ingredients).length){
     ingredients = Object.keys(props.ingredients).map((igKey)=>{
        return [...Array( props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredients key={igKey +i} type={igKey}/>
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    });
}
    if(ingredients.length===0){
        ingredients=<p>PLEASE ADD</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
           {ingredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}

export default burger;