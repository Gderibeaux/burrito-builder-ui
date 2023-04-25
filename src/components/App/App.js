import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .catch((err) => {
        console.error('Error fetching:', err.message);
        this.setState({err: err.message})
      })
      .then((data) => {
        this.setState({ orders: data.orders})
      })
  }

  newBurrito = order => {
    this.setState({orders: [...this.state.orders, order]})
  }

  handleDelete = id => {
    fetch(`http://localhost:3001/api/v1/orders/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        const updatedOrders = this.state.orders.filter(order => order.id !== id);
        this.setState({ orders: updatedOrders });
      })
      .catch(err => console.log('ERROR', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm newBurrito={this.newBurrito}/>
        </header>

        <Orders orders={this.state.orders} handleDelete={this.handleDelete}/>
      </main>
    );
  }
}


export default App;
