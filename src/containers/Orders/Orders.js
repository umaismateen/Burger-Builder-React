import React, {Component} from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Orders/Order';

class Orders extends Component{
   state={
       orders: [],
       loading: true,
   }

   componentDidMount(){
       axios.get('/orders.json')
          .then(res=>{
              const fetchedOrders=[];
              for (let key in res.data){
                  fetchedOrders.push({
                      ...res.data[key],
                      id: key,
                  })
              }
              this.setState({loading:false,orders:fetchedOrders});
          }).catch(err=>{
              this.setState({ loading: false });
          })
   }

    render(){ 
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order
                    price ={+order.price}
                    ingredients={order.ingredients}
                    key={order.id}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);