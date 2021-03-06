import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import axios from "axios";

class OrderList extends React.Component {
  state = {
    listOfOrders: [],
  };

  componentDidMount() {
    this.getOrderList();
  }

  getOrderList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/summary`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          listOfOrders: responseFromApi.data,
        });
      });
  };

  renderOrderList = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className='is-info'>Order Number</th>
          </tr>
        </thead>
        {this.state.listOfOrders.map((order) => {
          return (
            <tbody>
              <th key={order}>
                <Link to={`/profile/orders/${order}`}>
                  Order {order.substring(0, 5)}
                </Link>
              </th>
            </tbody>
          );
        })}
      </table>
    );
  };

  render() {
    const { userIsLoggedIn } = this.props;
    if (userIsLoggedIn) {
      return (
        <section className="order-list">
          {this.state.listOfOrders.length !== 0 ? (
            this.renderOrderList()
          ) : (
            <div className="notification is-info">Currently No Order</div>
          )}
        </section>
      );
    } else {
      return (
        <div className="login-signup">
          <Login getUser={this.props.getUser} />
          <Signup getUser={this.props.getUser} />
        </div>
      );
    }
  }
}

export default OrderList;
