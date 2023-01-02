import React from "react";
import classes from "./navbar.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import {toggleShowCart} from '../../redux/cartSlice'
import { login } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { showCart, products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
     dispatch(login())
     navigate('/login')
  }

  const handleCloseCart = () => {
    if(showCart){
        dispatch(toggleShowCart())
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to={"/"} onClick={handleCloseCart} className={classes.left}>
          <h1 className={classes.title}>WebDevMania</h1>
        </Link>
        <div className={classes.right}>
          <Link to="/create" className={classes.createBtn}>
            Create product
          </Link>
          <span className={classes.username}>{user?.username}</span>
          <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
          <div
            className={classes.cartContainer}
            onClick={() => dispatch(toggleShowCart())}
          >
            <AiOutlineShoppingCart className={classes.cartIcon} />
            <span className={classes.cartNumber}>{products?.length}</span>
          </div>
        </div>
        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
