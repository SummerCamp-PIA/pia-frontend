import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../styles/HotelDetail.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../service/AuthContext';



Modal.setAppElement('#root');

const HotelDetail = () => {
  const { user, isAdmin } = useAuth();
  const [hotelData, setHotelData] = useState({});
  const [guest1, setGuest1] = useState({ name: '', surname: '', dob: '', id: '' });
  const [guest2, setGuest2] = useState({ name: '', surname: '', dob: '', id: '' });
  const [selectedRoom, setSelectedRoom] = useState('');
  const [accommodationType, setAccommodationType] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardOwner: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  let {id} = useParams()

  useEffect(() => {
    isAdmin()
    axios.get(`/hotel/${id}`)
      .then(response => setHotelData(response.data))
      .catch(error => console.error('Error fetching hotel data:', error));
  }, []);

  useEffect(() => {
    let amount = 0;
    if (selectedRoom && accommodationType) {
      const room = hotelData.rooms?.find(room => room.type === selectedRoom);
      const accommodation = hotelData.accommodationTypes?.find(type => type.name === accommodationType);
      amount = (room?.price || 0) + (accommodation?.price || 0);
    }
    setTotalAmount(amount);
  }, [selectedRoom, accommodationType, hotelData]);

  const handlePayment = () => {
    setIsPaymentModalOpen(true);
  };

  const submitPayment = () => {
    axios.post('/processPayment', {
      amount: totalAmount,
      paymentDetails
    })
    .then(response => {
      if (response.data.success) {
        alert('Payment successful');
      } else {
        alert('Payment failed: ' + response.data.message);
      }
      setIsPaymentModalOpen(false);
    })
    .catch(error => {
      alert('Payment failed: ' + error.message);
      setIsPaymentModalOpen(false);
    });
  };

  return (
    <div className="hotel-booking">
      <header>
        <h1>{hotelData.name}</h1>
        <img src={hotelData.image} alt="Hotel" />
        <p>{hotelData.location}</p>
        <p>{hotelData.description}</p>
        <p>Rating: {hotelData.rating}</p>
        <div className="comments">
          {hotelData.comments?.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </header>

      <section className="guest-info">
        <div className="guest">
          <label>Guest 1</label>
          <input placeholder="Name" value={guest1.name} onChange={(e) => setGuest1({ ...guest1, name: e.target.value })} />
          <input placeholder="Surname" value={guest1.surname} onChange={(e) => setGuest1({ ...guest1, surname: e.target.value })} />
          <input placeholder="Date of Birth" value={guest1.dob} onChange={(e) => setGuest1({ ...guest1, dob: e.target.value })} />
          <input placeholder="ID Number" value={guest1.id} onChange={(e) => setGuest1({ ...guest1, id: e.target.value })} />
        </div>
        <div className="guest">
          <label>Guest 2</label>
          <input placeholder="Name" value={guest2.name} onChange={(e) => setGuest2({ ...guest2, name: e.target.value })} />
          <input placeholder="Surname" value={guest2.surname} onChange={(e) => setGuest2({ ...guest2, surname: e.target.value })} />
          <input placeholder="Date of Birth" value={guest2.dob} onChange={(e) => setGuest2({ ...guest2, dob: e.target.value })} />
          <input placeholder="ID Number" value={guest2.id} onChange={(e) => setGuest2({ ...guest2, id: e.target.value })} />
        </div>
      </section>

      <section className="room-choice">
        <h2>Room Choice</h2>
        <div className="rooms">
          {hotelData.rooms?.map(room => (
            <div className="room" key={room.type}>
              <img src={room.image} alt={room.type} />
              <button onClick={() => setSelectedRoom(room.type)}>
                {room.type} - {room.price}$
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="accommodation-choice">
        <h2>Accommodation Choice</h2>
        <div className="accommodation-types">
          {hotelData.accommodationTypes?.map(type => (
            <div key={type.name}>
              <input 
                type="radio" 
                name="accommodationType" 
                value={type.name} 
                checked={accommodationType === type.name} 
                onChange={() => setAccommodationType(type.name)} 
              />
              {type.name} - {type.price}$
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>Total Amount: {totalAmount}$</p>
        <button onClick={handlePayment}>Go to Payment</button>
      </footer>

      <Modal isOpen={isPaymentModalOpen} onRequestClose={() => setIsPaymentModalOpen(false)} className="payment-modal">
        <h2>Payment</h2>
        <p>Price: {totalAmount}$</p>
        <div className="payment-form">
          <input
            type="text"
            placeholder="Full Name of the card owner"
            value={paymentDetails.cardOwner}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardOwner: e.target.value })}
          />
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Expiration Date"
            value={paymentDetails.expiryDate}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="CVC/CVV"
            value={paymentDetails.cvc}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
          />
        </div>
        <button onClick={submitPayment}>Make Payment</button>
      </Modal>
    </div>
  );
};

export default HotelDetail;