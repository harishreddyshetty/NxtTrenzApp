// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const pricesList = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )

      const totalPrice = pricesList.reduce((a, b) => a + b)

      return (
        <div className="order-total-container">
          <h1 className="order-total">
            Order Total: <span className="price">{totalPrice}/-</span>
          </h1>
          <p className="items-quantity">{cartList.length} items in cart</p>
          <button className="check-out-btn" type="button">
            CheckOut
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
