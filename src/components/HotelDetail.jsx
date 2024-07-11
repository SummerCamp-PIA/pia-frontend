import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../styles/HotelDetail.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../service/AuthContext";
import Select from "react-select";
import { FaStar } from "react-icons/fa";

Modal.setAppElement("#root");

const HotelDetail = () => {
  const { user, isAdmin } = useAuth();
  const [hotelData, setHotelData] = useState({});
  const [guests, setGuests] = useState([
    { name: "", surname: "", dob: "", id: "" },
  ]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [accommodationOptions, setAccommodationOptions] = useState([]);
  const [selectedAccommodationTypes, setSelectedAccommodationTypes] = useState(
    []
  );
  const [roomOptions, setRoomOptions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [rating, setRating] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    cardOwner: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/hotel/${id}`)
      .then((response) => {
        setHotelData(response.data);
        setAccommodationOptions(
          response.data.accommodationTypes.map((type) => ({
            value: type.name,
            label: type.name,
          }))
        );
        setRoomOptions(
          response.data.rooms.map((room) => ({
            value: room.type,
            label: room.type,
          }))
        );
        setRating(response.data.rating); // Otelin rating değerini set et
      })
      .catch((error) => console.error("Error fetching hotel data:", error));
  }, [id]);

  const handleRoomSelection = (selectedOption) => {
    const room = hotelData.rooms.find(
      (room) => room.type === selectedOption.value
    );
    setSelectedRoom(selectedOption.value);
    setSelectedRoomDetails(room);
    setGuests(
      new Array(room.beds).fill({ name: "", surname: "", dob: "", id: "" })
    );
  };

  const handleAccommodationSelection = (selectedOptions) => {
    setSelectedAccommodationTypes(
      selectedOptions.map((option) => option.value)
    );
  };

  const handleConfirmation = () => {
    if (selectedRoom && selectedAccommodationTypes.length > 0) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/calculateTotal`, {
          roomType: selectedRoom,
          accommodationTypes: selectedAccommodationTypes,
        })
        .then((response) => {
          setTotalAmount(response.data.totalAmount);
          setIsConfirmed(true);
        })
        .catch((error) =>
          console.error("Error calculating total amount:", error)
        );
    } else {
      alert("Please select both a room and at least one accommodation type.");
    }
  };

  const handlePayment = () => {
    if (isConfirmed) {
      setIsPaymentModalOpen(true);
    } else {
      alert("Please confirm your selections first.");
    }
  };

  const submitPayment = () => {
    axios
      .post("/processPayment", {
        amount: totalAmount,
        paymentDetails,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Payment successful");
        } else {
          alert("Payment failed: " + response.data.message);
        }
        setIsPaymentModalOpen(false);
      })
      .catch((error) => {
        alert("Payment failed: " + error.message);
        setIsPaymentModalOpen(false);
      });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} color={i <= rating ? "#ffc107" : "#e4e5e9"} size={20} />
      );
    }
    return stars;
  };

  return (
    <div className="hotel-booking">
      <header>
        <h1>{hotelData.name}</h1>
        <img src={hotelData.image} alt="Hotel" />
        <p>{hotelData.location}</p>
        <p>{hotelData.description}</p>
        <div className="rating">{renderStars()}</div>
        <div className="comments">
          {hotelData.comments?.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </header>

      <section className="guest-info">
        {guests.map((guest, index) => (
          <div className="guest" key={index}>
            <label>Guest {index + 1}</label>
            <input
              placeholder="Name"
              value={guest.name}
              onChange={(e) => {
                const newGuests = [...guests];
                newGuests[index].name = e.target.value;
                setGuests(newGuests);
              }}
            />
            <input
              placeholder="Surname"
              value={guest.surname}
              onChange={(e) => {
                const newGuests = [...guests];
                newGuests[index].surname = e.target.value;
                setGuests(newGuests);
              }}
            />
            <input
              placeholder="Date of Birth"
              value={guest.dob}
              onChange={(e) => {
                const newGuests = [...guests];
                newGuests[index].dob = e.target.value;
                setGuests(newGuests);
              }}
            />
            <input
              placeholder="ID Number"
              value={guest.id}
              onChange={(e) => {
                const newGuests = [...guests];
                newGuests[index].id = e.target.value;
                setGuests(newGuests);
              }}
            />
          </div>
        ))}
      </section>

      <section className="accommodation-choice">
        <h2>Accommodation Choice</h2>
        <Select
          name="accommodationType"
          className="filter-multi-select"
          options={accommodationOptions}
          isMulti
          value={selectedAccommodationTypes.map((type) =>
            accommodationOptions.find((option) => option.value === type)
          )}
          onChange={handleAccommodationSelection}
          placeholder="Accommodation Type"
        />
      </section>

      <section className="room-choice">
        <h2>Room Choice</h2>
        <Select
          name="roomType"
          className="filter-single-select"
          options={roomOptions}
          value={roomOptions.find((option) => option.value === selectedRoom)}
          onChange={handleRoomSelection}
          placeholder="Room Type"
        />
        {selectedRoomDetails && (
          <div className="room-details">
            <img
              src={selectedRoomDetails.image}
              alt={selectedRoomDetails.type}
            />
            <div>Number of beds: {selectedRoomDetails.beds}</div>
            <div>
              Jacuzzi: {selectedRoomDetails.jacuzzi ? "Yes" : "No"} <br />
              Balcony: {selectedRoomDetails.balcony ? "Yes" : "No"} <br />
              Mini bar: {selectedRoomDetails.miniBar ? "Yes" : "No"} <br />
              Air Conditioning:{" "}
              {selectedRoomDetails.airConditioning ? "Yes" : "No"}
            </div>
          </div>
        )}
      </section>

      <footer>
        <p>Total Amount: {totalAmount}$</p>
        <button onClick={handleConfirmation}>Confirm Selection</button>
        <button onClick={handlePayment} disabled={!isConfirmed}>
          Go to Payment
        </button>
      </footer>

      <Modal
        isOpen={isPaymentModalOpen}
        onRequestClose={() => setIsPaymentModalOpen(false)}
        className="payment-modal"
      >
        <h2>Payment</h2>
        <p>Price: {totalAmount}$</p>
        <div className="payment-form">
          <input
            type="text"
            placeholder="Full Name of the card owner"
            value={paymentDetails.cardOwner}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cardOwner: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cardNumber: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Expiration Date"
            value={paymentDetails.expiryDate}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                expiryDate: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="CVC/CVV"
            value={paymentDetails.cvc}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cvc: e.target.value })
            }
          />
        </div>
        <button onClick={submitPayment}>Make Payment</button>
      </Modal>
    </div>
  );
};

export default HotelDetail;
