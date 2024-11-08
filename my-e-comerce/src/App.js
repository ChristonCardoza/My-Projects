import React, { useState, useEffect } from 'react';
import { commerce } from './Lib/Commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    // console.log(data)
    setProducts(data);
  }
  
  const fetchCart = async (productId, quantity) => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, {quantity});

    setCart(cart);
  }
  
  const handleRemoveFromCart = async(productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async() => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  const refreshCart = async() => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);

  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        {/* <Cart cart={cart} /> */}
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart"> 
            <Cart 
              cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout" >
            <Checkout 
            cart={cart} 
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />
          </Route>
        </Switch>
    </div> 
    </Router>
  );
}

export default App;
