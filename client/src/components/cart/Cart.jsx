import React from "react";
import classes from "./cart.module.css";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  emptyCart,
  toggleShowCart,
} from "../../redux/cartSlice";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let total = 0;
  products?.length > 0 &&
    products?.map(
      (product) => (total += Number(product.price) * Number(product.quantity))
    );

  const removeFromCart = (id) => {
    dispatch(removeProduct({ id }));
  };

  const resetCart = () => {
    dispatch(emptyCart());
  };

  const handleCloseCart = () => {
    dispatch(toggleShowCart())
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {total > 0 && <h2 className={classes.title}>Cart Items</h2>}
        <div className={classes.cartItems}>
          {products?.length === 0 ? (
            <h1 className={classes.noProducts}>No products yet in cart.</h1>
          ) : (
            products?.map((product) => (
                <div key={product.id} className={classes.cartItem}>
                  <Link onClick={handleCloseCart} to={`/productDetail/${product.id}`}>
                    <img
                      src={`http://localhost:5000/images/${product?.mainImg}`}
                      className={classes.img}
                      alt=""
                    />
                  </Link>
                  <div className={classes.priceAndTitle}>
                    <p className={classes.productTitle}>{product.title}</p>
                    <span className={classes.price}>
                      {product.quantity} x <span>$</span> {product.price}
                    </span>
                  </div>
                    <BsFillTrashFill
                      onClick={() => removeFromCart(product.id)}
                      className={classes.trashIcon}
                    />
                </div>
            ))
          )}
        </div>
        {total > 0 && (
          <>
            <div className={classes.subtotal}>
              <span>Subtotal</span>
              <span className={classes.totalPrice}>
                <span>$</span> {Number(total).toFixed(2)}
              </span>
            </div>
            <Link to="/addressDetails" onClick={handleCloseCart} className={classes.checkoutBtn}>Proceed to checkout</Link>
          </>
        )}
      </div>
      {total > 0 && (
        <div onClick={resetCart} className={classes.resetCart}>
          Reset Cart
        </div>
      )}
      <CiCircleRemove
        onClick={handleCloseCart}
        className={classes.removeIcon}
      />
    </div>
  );
};

export default Cart;
