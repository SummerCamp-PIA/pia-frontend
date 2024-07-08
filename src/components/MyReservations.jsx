import React from 'react';

const MyReservations = ({ reservations }) => {
  return (
    <div className="reservations">
      <h2>My Reservations</h2>
      {reservations.map((reservation, index) => (
        <div className="reservation" key={index}>
          <p>Check-in/Check-out Dates: {reservation.dates}</p>
          <div className="details">
            <img src={reservation.image} alt="Hotel" />
            <div>
              <p>Hotel Name: {reservation.hotelName}</p>
              <p>Location: {reservation.location}</p>
              <p>Rating: {reservation.rating}</p>
              <p>Reservation Date: {reservation.reservationDate}</p>
            </div>
            <div className="rating">
              <p>Rate</p>
              <input type="text" placeholder="Comment..." />
              <button>Send</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReservations;