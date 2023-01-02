import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/authSlice'
import classes from './login.module.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()

    try {
        console.log(email, password)
        const res = await fetch(`http://localhost:5000/auth/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({email, password})
        })
        if(res.status === 404){
            throw new Error("Wrong credentials")
        }
        const data = await res.json()
        dispatch(login(data))
        navigate('/')
    } catch (error) {
        setError(prev => true)
        setTimeout(() => {
            setError(prev => false)
        }, 2500)
        console.error(error)
    }
  }

  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2 className={classes.title}>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' placeholder='Enter email'/>
                </label>
                <label htmlFor="password">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' placeholder='Enter password'/>
                </label>
                <button className={classes.submitBtn}>Login</button>
                <Link to="/register">Don't have an account? <p className={classes.register}>Register now</p></Link>
            </form>
            {error && 
           <div className={classes.errorMessage}>
                Wrong credentials! Try different ones.
            </div>
            }
        </div>
    </div>
  )
}

export default Login