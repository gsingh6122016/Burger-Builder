import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const Burger = (props) => {
    let transeformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    .reduce((arr, el ) => {
        return arr.concat(el)
    }, []);
    
    if (transeformedIngredients.length === 0) {
        transeformedIngredients = <p>please add some ingredients!!</p>
    }

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
            {transeformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;