import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/input';
import { connect } from 'react-redux'; 
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../Store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
           
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'your name'
                    },
                    value: ''
                    // validation: {
                    //     required: true
                    // },
                    // valid: true
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'street'
                    },
                    value: ''
                    // validation: {
                    //     required: true
                    // },
                    // valid: true
                },
                pinCoce: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'pincode'
                    },
                    value: ''
                    // validation: {
                    //     required: true
                    // },
                    // valid: true
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'country'
                    },
                    value: ''
                    // validation: {
                    //     required: true
                    // },
                    // valid: true
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'your E-mail'
                    },
                    value: ''
                    // validation: {
                    //     required: true
                    // },
                    // valid: true
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options:[ 
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                    },
                    value: 'fastest'
                }
        }
        
    }

    orderHandler = (event) => {
        event.preventDefault();
       
                
        const formData = {};
         for ( let formElementIdentifier in this.state.orderForm) {
            
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
         }

        const order = { 
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData 
            
        }
        this.props.onOrderBurger(order);
        

      
    }

    checkValidity = (value, rules) => {
        let isValid= false;

        if(rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    }

    

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = { 
           ...updatedOrderForm[inputIdentifier]
       };

       updatedFormElement.value = event.target.value;
    //    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
       updatedOrderForm[inputIdentifier] = updatedFormElement;
       this.setState({orderForm: updatedOrderForm});
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <Button  btnType="Success">ORDER</Button>
                </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToprops = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    };
   
};

export default connect(mapStateToprops, mapDispatchToProps)(withErrorHandler(ContactData, axios));