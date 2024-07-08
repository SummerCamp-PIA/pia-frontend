import React, { useState, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import '../styles/HomeFilter.css';

const HomeFilter = () => {
  const [filters, setFilters] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    rooms: '',
    adults: '',
    minPrice: '',
    maxPrice: '',
    accommodationType: '',
    propertyType: '',
    amenities: []
  });
  const [priceError, setPriceError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const typingTimer = useRef(null);

  const accommodationOptions = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'apartment', label: 'Apartment' }
  ];

  const propertyOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const amenitiesOptions = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'pool', label: 'Pool' },
    { value: 'parking', label: 'Parking' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (name === 'minPrice' || name === 'maxPrice') {
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        validatePriceRange();
      }, 2000); // 2 saniye bekleme süresi
    }
  };

  const validatePriceRange = () => {
    const { minPrice, maxPrice } = filters;

    if (minPrice && maxPrice) {
      if (parseFloat(minPrice) > parseFloat(maxPrice)) {
        setPriceError('Minimum price should be less than or equal to maximum price.');
        setIsModalOpen(true);
      } else {
        setPriceError('');
        setIsModalOpen(false);
      }
    }
  };

  const handleSelectChange = (selectedOptions, action) => {
    setFilters({ ...filters, [action.name]: selectedOptions ? selectedOptions.value : '' });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFilters({ ...filters, amenities: selectedOptions ? selectedOptions.map(option => option.value) : [] });
  };

  const handleSubmit = () => {
    if (priceError) {
      setIsModalOpen(true);
      return;
    }

    const backendUrl = 'http://your-backend-url.com/api/search';

    axios.post(backendUrl, filters)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleClearFilters = () => {
    setFilters({
      destination: '',
      checkIn: '',
      checkOut: '',
      rooms: '',
      adults: '',
      minPrice: '',
      maxPrice: '',
      accommodationType: [],
      propertyType: [],
      amenities: []
    });
    setPriceError('');
    setIsModalOpen(false);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        name="destination"
        className="filter-input"
        placeholder="Destination"
        value={filters.destination}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkIn"
        className="filter-input"
        value={filters.checkIn}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkOut"
        className="filter-input"
        value={filters.checkOut}
        onChange={handleChange}
      />
      <div className="filter-occupancy">
        <input
          type="number"
          name="rooms"
          className="filter-input"
          placeholder="Rooms"
          value={filters.rooms}
          onChange={handleChange}
        />
        <input
          type="number"
          name="adults"
          className="filter-input"
          placeholder="Adults"
          value={filters.adults}
          onChange={handleChange}
        />
      </div>
      <input
        type="number"
        name="minPrice"
        className="filter-input"
        placeholder="Min. Price"
        value={filters.minPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxPrice"
        className="filter-input"
        placeholder="Max. Price"
        value={filters.maxPrice}
        onChange={handleChange}
      />
      <Select
        name="accommodationType"
        className="filter-multi-select"
        options={accommodationOptions}
        isMulti
        onChange={handleSelectChange}
        placeholder="Accommodation Type"
      />
      <Select
        name="propertyType"
        className="filter-multi-select"
        options={propertyOptions}
        isMulti
        onChange={handleSelectChange}
        placeholder="Property Type"
      />
      <Select
        name="amenities"
        className="filter-multi-select"
        options={amenitiesOptions}
        isMulti
        onChange={handleMultiSelectChange}
        placeholder="Amenities"
      />
      <button className="filter-button filter-button-search" onClick={handleSubmit}>SEARCH</button>
      <button className="filter-button filter-button-clear" onClick={handleClearFilters}>Clear Filters</button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Price Error" className="price-error-modal">
        <div className="modal-content">
          <p>{priceError}</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default HomeFilter;
