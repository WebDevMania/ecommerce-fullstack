import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <h2>FAQ</h2>
          <span>What we sell</span>
          <span>How can you order</span>
          <span>What currency we accept</span>
          <span>Privacy policy</span>
        </div>
        <div className={classes.column}>
          <h2>About</h2>
          <p className={classes.aboutParagraph}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae magnam molestias dolorem praesentium itaque rem, iste,
            distinctio, voluptate doloribus corporis omnis facere dolores
            reiciendis! Debitis maxime necessitatibus assumenda molestiae ex.
          </p>
        </div>
        <div className={classes.column}>
          <h2>Contact</h2>
          <div className={classes.icons}>
            <AiOutlineInstagram />
            <AiOutlineFacebook />
            <AiOutlineTwitter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
