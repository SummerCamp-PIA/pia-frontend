import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeHotelType.css';

//Statik olcak

const hotels = [
  { id: 1, name: 'Honeymoon Hotels', image: 'images/hotels/hotel.jpeg' },
  { id: 2, name: 'Discounted Hotels', image: 'discounted-hotel.jpg' },
  { id: 3, name: 'Popular Hotels', image: 'popular-hotel.jpg' },
  { id: 4, name: 'Hotels in Antalya', image: 'antalya-hotel.jpg' }
];

const HomeHotelTypes = () => {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/hotels?filter=${name}`);
  };

  return (
    <div className="hotel-card-container">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="hotel-card"
          style={{ backgroundImage: `url(${hotel.image})` }}
        >
          <div
            className="hotel-card-overlay"
            onClick={() => handleCardClick(hotel.name)}
          >
            <span className="hotel-card-text">{hotel.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeHotelTypes;