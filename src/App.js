import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    if (cartList.length >= 1) {
      const findProduct = cartList.filter(
        eachItem => eachItem.id === product.id,
      )
      if (findProduct.length >= 1) {
        const updateQuantity = cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {
              availability: eachItem.availability,
              brand: eachItem.brand,
              description: eachItem.description,
              id: eachItem.id,
              imageUrl: eachItem.imageUrl,
              price: eachItem.price,
              quantity: eachItem.quantity + 1,
              rating: eachItem.rating,
              title: eachItem.title,
              totalReviews: eachItem.totalReviews,
            }
          }
          return eachItem
        })
        this.setState({cartList: updateQuantity})
      } else {
        this.setState(prevState => ({
          cartList: [...prevState.cartList, product],
        }))
      }
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const UpdatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: UpdatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state

    const UpdatedProductQuantity = cartList.map(eachItem => {
      if (eachItem.id === product[0].id) {
        return {
          availability: product[0].availability,
          brand: product[0].brand,
          description: product[0].description,
          id: product[0].id,
          imageUrl: product[0].imageUrl,
          price: product[0].price,
          quantity: product[0].quantity + 1,
          rating: product[0].rating,
          title: product[0].title,
          totalReviews: product[0].totalReviews,
        }
      }
      return eachItem
    })

    this.setState({cartList: UpdatedProductQuantity})
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state

    const UpdatedProductQuantity = cartList.map(eachItem => {
      if (eachItem.id === product[0].id) {
        return {
          availability: product[0].availability,
          brand: product[0].brand,
          description: product[0].description,
          id: product[0].id,
          imageUrl: product[0].imageUrl,
          price: product[0].price,
          quantity: product[0].quantity - 1,
          rating: product[0].rating,
          title: product[0].title,
          totalReviews: product[0].totalReviews,
        }
      }
      return eachItem
    })
    this.setState({cartList: UpdatedProductQuantity})
    const productQuantity = UpdatedProductQuantity.filter(
      eachItem => eachItem.id === product[0].id,
    )
    const remainingList = UpdatedProductQuantity.filter(
      eachItem => eachItem.id !== product[0].id,
    )
    if (productQuantity[0].quantity === 0) {
      this.setState({cartList: remainingList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
