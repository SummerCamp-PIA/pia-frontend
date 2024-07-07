import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/HomePage.css";
import profilePic from "../assets/images/logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(null);

  const guestOptions = [
    { value: 1, label: "1 Guest" },
    { value: 2, label: "2 Guests" },
    { value: 3, label: "3 Guests" },
    { value: 4, label: "4 Guests" },
    { value: 5, label: "5 Guests" },
    { value: 6, label: "6 Guests" },
  ];

  const handleSearch = () => {
    console.log({
      location,
      checkInDate,
      checkOutDate,
      guests,
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="homepage-container">
      <header>
        <div className="image-container">
          <img
            src={profilePic}
            alt="Profile"
            style={{
              marginLeft: "-10px",
              marginTop: "20px",
              width: "250px", // Adjust the value as needed
              height: "250px", // Adjust the value as needed
            }}
          />
        </div>
        <nav>
          <button onClick={handleLoginClick}>Log-in</button>
          <button onClick={handleRegisterClick}>Register</button>
          <button>Contact</button>
        </nav>
      </header>
      <section className="filtration">
        <div className="form-group">
          <label style={{ backgroundColor: "#ffcb96", fontWeight: "bold" }}>
            Destination
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        <div className="form-group">
          <label style={{ backgroundColor: "#ffcb96", fontWeight: "bold" }}>
            Check-in
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            placeholderText="Select check-in date"
          />
        </div>
        <div className="form-group">
          <label style={{ backgroundColor: "#ffcb96", fontWeight: "bold" }}>
            Check-out
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            placeholderText="Select check-out date"
          />
        </div>
        <div className="form-group">
          <label style={{ backgroundColor: "#ffcb96", fontWeight: "bold" }}>
            Occupancy
          </label>
          <Select
            options={guestOptions}
            value={guests}
            onChange={setGuests}
            placeholder="Select number of guests"
          />
        </div>
        <div className="form-group">
          <button className="search-btn" onClick={handleSearch}>
            SEARCH
          </button>
          <button className="clear-btn">Clear Filters</button>
        </div>
      </section>
      <section className="hotel-categories">
        <div className="category">Honeymoon Hotels</div>
        <div className="category">Discounted Hotels</div>
        <div className="category">Popular Hotels</div>
        <div className="category">Hotels in Antalya</div>
      </section>
      <section className="features">
        <div className="feature">
          <div className="feature-icon">Icon</div>
          <p>Trusted customer service you can rely on, 24/7</p>
        </div>
        <div className="feature">
          <div className="feature-icon">Icon</div>
          <p>Reliable Payment Systems</p>
        </div>
        <div className="feature">
          <div className="feature-icon">Icon</div>
          <p>Discount Opportunities</p>
        </div>
        <div className="feature">
          <div className="feature-icon">Icon</div>
          <p>More than 5000 hotels worldwide</p>
        </div>
      </section>
      <footer>
        <div className="footer-logo">Logo</div>
        <div className="footer-contact">
          <p>Name of the website</p>
          <p>+90 526 26 26</p>
          <p>mailexample@mail.com</p>
          <p>Address</p>
        </div>
        <div className="footer-links">
          <p>About us</p>
          <p>KVKK</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
