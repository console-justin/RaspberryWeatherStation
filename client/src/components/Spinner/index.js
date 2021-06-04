import React from "react";
import styles from "./styles.css";
import PropTypes from "prop-types";

function Spinner({ color, size }) {
  const style = {
    height: size,
    width: size,
    backgroundColor: color,
  };

  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1} style={style} />
      <div className={styles.bounce2} style={style} />
      <div className={styles.bounce3} style={style} />
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;
