import React ,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
     state = {
         name: '',
         email: '',
         address: {
             streer: '',
             postalCode: '',
         },
         loading: false,

     }

     orderHandler=(event)=>{
       event.preventDefault();
           this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Podr',
                address: {
                    streer: "3"
                },
                country: "Pakistan",
                email: "test@test.com"
            },
            deliveryMethod: "Fastest",
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

     render(){
         let form=(
             <form>
                 <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                 <input className={classes.Input} type="email" ame="email" placeholder="Your email" />
                 <input className={classes.Input} type="text" name="street" placeholder="Street" />
                 <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
                 <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
             </form>
         );
         if(this.state.loading){
             form=<Spinner/>;
         }
         return(
             <div className={classes.ContactData}>
                 <h4>Enter you Contact Data</h4>
                 {form}
             </div>
         );
     }
}

export default ContactData;