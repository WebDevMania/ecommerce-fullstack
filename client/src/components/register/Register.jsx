import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./register.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (confirmPass !== password) return;

    try {
      const res = await fetch(`http://localhost:5000/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      if(res.status === 404){
        throw new Error("Wrong credentials")
    }
      const data = await res.json();
      navigate("/");
      dispatch(register(data));
    } catch (error) {
      setError((prev) => true);
      setTimeout(() => {
        setError((prev) => false);
      }, 2500);
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Register</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="username">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="Enter username"
            />
          </label>
          <label htmlFor="email">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter email"
            />
          </label>
          <label htmlFor="password">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter password"
            />
          </label>
          <label htmlFor="confirmPass">
            <input
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              id="confirmPass"
              placeholder="Confirm password"
            />
          </label>
          <button className={classes.submitBtn}>Register</button>
          <Link to="/login">
            Already have an account? <p className={classes.login}>Login now</p>
          </Link>
        </form>
        {error && 
           <div className={classes.errorMessage}>
                Wrong credentials! Try different ones.
            </div>
            }
      </div>
    </div>
  );
};

export default Register;
