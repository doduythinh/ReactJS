import React ,{ Component } from 'react';
import  Order from '../../Component/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHander/withErrorHander";
import order from "../../Component/Order/Order";
import  * as  actions from '../../store/actions/index';
import  { connect } from  'react-redux';
import Spinner from "../../Component/UI/Spinner/Spinner";

class Orders extends Component
{
    componentDidMount() {
       this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner  />
        if(!this.props.loading)
        {
                orders = this.props.orders.map(order =>(
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))

        }
        return(
            <div>
                {orders}
            </div>
        );
    }
} 

const mapStateToProps = state => {
    console.log("stateorder",state.order.orders)
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    console.log("1111222233334444",actions.fetchOrders())
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token, userId))

    }

}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));