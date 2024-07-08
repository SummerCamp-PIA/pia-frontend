import React, { useEffect, useState } from 'react';
import '../styles/HotelList.css';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchHotels();
    }, []);

    // const fetchHotels = async () => {
    //     try {
    //         const response = await fetch('YOUR_API_ENDPOINT');
    //         const data = await response.json();
    //         setHotels(data);
    //     } catch (error) {
    //         console.error('Error fetching hotels:', error);
    //     }
    // };

    const fetchHotels = async () => {
        // Test verileri
        const testData = [
            {
                name: 'Hotel A',
                location: 'Location A',
                image: 'https://via.placeholder.com/150',
                accomodationType: 'Type A',
                propertyType: 'Property A',
                facilities: ['WiFi', 'Pool', 'Gym'],
                rating: 4.5,
                nights: 3,
                price: 150
            },
            {
                name: 'Hotel B',
                location: 'Location B',
                image: 'https://via.placeholder.com/150',
                accomodationType: 'Type B',
                propertyType: 'Property B',
                facilities: ['WiFi', 'Parking', 'Spa'],
                rating: 4.0,
                nights: 2,
                price: 200
            }
        ];

        setHotels(testData);
    };

    return (
        <div className="hotel-list">
            {hotels.map((hotel, index) => (
                <div className="hotel-card" key={index}>
                    <div className="hotel-image">
                        <img src={hotel.image} alt={`${hotel.name} Image`} />
                    </div>
                    <div className="hotel-info">
                        <h2>{hotel.name}</h2>
                        <p>{hotel.location}</p>
                        <p>Informations about the hotel</p>
                        <p>- Accomodation Type: {hotel.accomodationType}</p>
                        <p>- Property Type: {hotel.propertyType}</p>
                        <p>- Facilities: {hotel.facilities.join(', ')}</p>
                        <div className="hotel-rating">
                            <span>Rating: {hotel.rating}</span>
                        </div>
                        <div className="hotel-reservation">
                            <p>{hotel.nights} nights</p>
                            <p>{hotel.price} $</p>
                            <button>Make Reservation</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotelList;