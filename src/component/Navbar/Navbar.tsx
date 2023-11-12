import React from 'react';
import './Navbar.scss';

const Navbar = ({ setUser }: any) => {
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__container__logo">
          <img
            src="https://res.cloudinary.com/dqaerysgb/image/upload/v1651333819/Earth-Planet-PNG-Picture_btbdtv.png"
            alt="logo"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="navbar__container__btn">
          <div className="navbar__container__btn--log" onClick={logOut}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
