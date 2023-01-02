import React from 'react'
import classes from './final.module.css'

const Final = () => {
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2>You have successfully made an order!</h2>
            <p>Delivery is usually between 2-4 days</p>
        </div>
    </div>
  )
}

export default Final