import React from 'react';
import './Orders.css';

const Orders = props => {
  console.log("PROPS", props)
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, key) => {
            return <li key={key}> {ingredient}</li>
          })}
        </ul>
        <button onClick={() => props.handleDelete(order.id)}>Delete</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;