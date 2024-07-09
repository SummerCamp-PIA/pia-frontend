import React from 'react';

const FeatureBox = () => {
  return (
    <div style={styles.container}>
      <div style={styles.feature}>
        <div style={styles.icon}>
          <img src="phone-icon.png" alt="Phone Icon" style={styles.iconImage} />
        </div>
        <div style={styles.text}>
          Trusted customer service you can rely on, 24/7
        </div>
      </div>
      <div style={styles.feature}>
        <div style={styles.icon}>
          <img src="payment-icon.png" alt="Payment Icon" style={styles.iconImage} />
        </div>
        <div style={styles.text}>
          Reliable Payment Systems
        </div>
      </div>
      <div style={styles.feature}>
        <div style={styles.icon}>
          <img src="discount-icon.png" alt="Discount Icon" style={styles.iconImage} />
        </div>
        <div style={styles.text}>
          Discount Opportunities
        </div>
      </div>
      <div style={styles.feature}>
        <div style={styles.icon}>
          <img src="hotel-icon.png" alt="Hotel Icon" style={styles.iconImage} />
        </div>
        <div style={styles.text}>
          More than 5000 hotels worldwide
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    border: '2px solid #000',
    borderRadius: '10px',
    marginTop: '3rem',
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24%',
  },
  icon: {
    marginBottom: '10px',
  },
  iconImage: {
    width: '50px',
    height: '50px',
  },
  text: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default FeatureBox;