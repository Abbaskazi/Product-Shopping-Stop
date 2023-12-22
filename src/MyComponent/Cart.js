import React from 'react';
import '../Style/Cart.css'

const Cart = ({ cartItems, onRemoveItem }) => {
  return (
    <div>
      
      <ul>
        {cartItems.map((item) => (
          <div className='cart-product-container' key={item.id}>
            <div className="thumbnail-image">
            <img src={item.thumbnail} alt="thumbnail"  className='cart-Thumbnail'/>
            </div>
            
            <span className='Product-Desc'>{item.title} - <i className='bx bx-rupee'></i>{item.price}</span>
            <br />
            <br />
            <button className='Delete-Btn' onClick={() => onRemoveItem(item)}>Delete <i class='bx bxs-trash' ></i></button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
