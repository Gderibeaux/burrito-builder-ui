import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleName = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  handleIngredients = event => {
    event.preventDefault();
    const ingredient = event.target.name
    const ingredients = [...this.state.ingredients, ingredient];
    this.setState({ ingredients })
  }
  handleSubmit = e => {
    e.preventDefault();
    const {name, ingredients} = this.state
    if (name && ingredients.length) {
      fetch('http://localhost:3001/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name, ingredients})
      })
      .then(response => response.json())
      .then(data => {
        this.props.newBurrito(data)
        this.clearInputs();
      })
      .catch(err => console.log('ERROR', err))
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={event => this.handleIngredients(event)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={event => this.handleName(event)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
