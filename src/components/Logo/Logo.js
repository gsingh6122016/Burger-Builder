import React from 'react';
import burgerLogo from '../../assets/images/demo.ico';
import classes from './Logo.module.css';
const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    );
};

export default Logo;