import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/input';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pincode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
       
        this.setState({loading: true});
        const order = { 
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Gourav singh",
                address: {
                    street: 'moldanga',
                    pinCoce: '713347',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
            })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render() {

        let form = (
            <form>
                    <Input inputtype='input' type="text" name="name" placeholder="your name" /><br />
                    <Input inputtype='input' type="text" name="email" placeholder="your email" /><br />
                    <Input inputtype='input' type="text" name="street" placeholder="street" /><br />
                    <Input inputtype='input' type="text" name="pincode" placeholder="pincode" /><br />
                    <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
                </form>
        );
        if(this.state.loading) {
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

export default ContactData;