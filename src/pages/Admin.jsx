import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Button, Checkbox, ListItemText, Box, Grid } from '@mui/material';
import '../styles/Admin.css'; 

const Admin = () => {
  const [hotelName, setHotelName] = useState('');
  const [hotelType, setHotelType] = useState('');
  const [starRating, setStarRating] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');

  const [roomType, setRoomType] = useState('');
  const [roomPrice, setRoomPrice] = useState('');

  const [accommodationType, setAccommodationType] = useState('');
  const [accommodationPrice, setAccommodationPrice] = useState('');

  const [roomAmenities, setRoomAmenities] = useState({ jacuzzi: false, beds: 0, ac: false, minibar: false, balcony: false });
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [viewType, setViewType] = useState([]);

  const [hotelAmenities, setHotelAmenities] = useState({
    parking: false, pool: false, spa: false, beach: false, honeymoonSuite: false, childFriendly: false, petFriendly: false, wifi: false, safe: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const hotelData = {
      hotelName,
      hotelType,
      starRating,
      phone,
      email,
      location: { country, city, district, address },
      roomTypes: { [roomType]: roomPrice },
      accommodationTypes: { [accommodationType]: accommodationPrice },
      roomAmenities,
      roomNumbers,
      viewType,
      hotelAmenities
    };
    console.log('Hotel Data:', hotelData);

    fetch('http://localhost:8080/hotels', {  // Burada backend URL'inizi kullanın
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotelData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleRoomNumberChange = (event) => {
    const value = event.target.value.split(',').map(num => num.trim());
    setRoomNumbers(value);
  };

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Otel Bilgileri Ekle</h2>
      
      <TextField label="Otel Adı" value={hotelName} onChange={(e) => setHotelName(e.target.value)} fullWidth margin="normal" />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Otel Tipi</InputLabel>
        <Select value={hotelType} onChange={(e) => setHotelType(e.target.value)}>
          <MenuItem value="resort">Resort</MenuItem>
          <MenuItem value="hotel">Hotel</MenuItem>
          <MenuItem value="apart">Apart</MenuItem>
          <MenuItem value="hostel">Hostel</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Yıldız Derecelendirmesi</InputLabel>
        <Select value={starRating} onChange={(e) => setStarRating(e.target.value)}>
          <MenuItem value={1}>1 Yıldız</MenuItem>
          <MenuItem value={2}>2 Yıldız</MenuItem>
          <MenuItem value={3}>3 Yıldız</MenuItem>
          <MenuItem value={4}>4 Yıldız</MenuItem>
          <MenuItem value={5}>5 Yıldız</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth margin="normal" />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
      
      <TextField label="Ülke" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth margin="normal" />
      <TextField label="Şehir" value={city} onChange={(e) => setCity(e.target.value)} fullWidth margin="normal" />
      <TextField label="İlçe" value={district} onChange={(e) => setDistrict(e.target.value)} fullWidth margin="normal" />
      <TextField label="Açık Adres" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth margin="normal" />

      <h3>Oda Tipleri ve Fiyatları</h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Oda Tipi</InputLabel>
            <Select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <MenuItem value="suite">Süit</MenuItem>
              <MenuItem value="standard">Standart</MenuItem>
              <MenuItem value="large">Büyük Oda</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Fiyat" type="number" value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} fullWidth />
        </Grid>
      </Grid>

      <h3>Konaklama Tipleri ve Fiyatları</h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Konaklama Tipi</InputLabel>
            <Select value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)}>
              <MenuItem value="single">Tek Kişilik</MenuItem>
              <MenuItem value="multiple">Çok Kişilik</MenuItem>
              <MenuItem value="onlyRoom">Sadece Oda</MenuItem>
              <MenuItem value="breakfast">Kahvaltı</MenuItem>
              <MenuItem value="allInclusive">Her Şey Dahil</MenuItem>
              <MenuItem value="breakfastDinner">Kahvaltı ve Akşam Yemeği</MenuItem>
              <MenuItem value="nonAlcoholicAllInclusive">Alkolsüz Her Şey Dahil</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Fiyat" type="number" value={accommodationPrice} onChange={(e) => setAccommodationPrice(e.target.value)} fullWidth />
        </Grid>
      </Grid>

      <h3>Oda Özellikleri</h3>
      <TextField label="Oda Sayısı ve Numaraları (virgülle ayrılmış)" onChange={handleRoomNumberChange} fullWidth margin="normal" />
      <FormControlLabel control={<Switch checked={roomAmenities.jacuzzi} onChange={(e) => setRoomAmenities({ ...roomAmenities, jacuzzi: e.target.checked })} />} label="Jakuzi" />
      <TextField label="Yatak Sayısı" type="number" value={roomAmenities.beds} onChange={(e) => setRoomAmenities({ ...roomAmenities, beds: e.target.value })} fullWidth margin="normal" />
      <FormControlLabel control={<Switch checked={roomAmenities.ac} onChange={(e) => setRoomAmenities({ ...roomAmenities, ac: e.target.checked })} />} label="Klima" />
      <FormControlLabel control={<Switch checked={roomAmenities.minibar} onChange={(e) => setRoomAmenities({ ...roomAmenities, minibar: e.target.checked })} />} label="Mini Bar" />
      <FormControlLabel control={<Switch checked={roomAmenities.balcony} onChange={(e) => setRoomAmenities({ ...roomAmenities, balcony: e.target.checked })} />} label="Balkon" />

      <FormControl fullWidth margin="normal">
        <InputLabel>Manzara Tipi</InputLabel>
        <Select multiple value={viewType} onChange={handleViewTypeChange}         renderValue={(selected) => selected.join(', ')}>
          <MenuItem value="Deniz">
            <Checkbox checked={viewType.indexOf('Deniz') > -1} />
            <ListItemText primary="Deniz" />
          </MenuItem>
          <MenuItem value="Orman">
            <Checkbox checked={viewType.indexOf('Orman') > -1} />
            <ListItemText primary="Orman" />
          </MenuItem>
          <MenuItem value="Göl">
            <Checkbox checked={viewType.indexOf('Göl') > -1} />
            <ListItemText primary="Göl" />
          </MenuItem>
          <MenuItem value="Havuz">
            <Checkbox checked={viewType.indexOf('Havuz') > -1} />
            <ListItemText primary="Havuz" />
          </MenuItem>
        </Select>
      </FormControl>

      <h3>Otel Özellikleri</h3>
      <FormControlLabel control={<Switch checked={hotelAmenities.parking} onChange={(e) => setHotelAmenities({ ...hotelAmenities, parking: e.target.checked })} />} label="Otopark" />
      <FormControlLabel control={<Switch checked={hotelAmenities.pool} onChange={(e) => setHotelAmenities({ ...hotelAmenities, pool: e.target.checked })} />} label="Havuz" />
      <FormControlLabel control={<Switch checked={hotelAmenities.spa} onChange={(e) => setHotelAmenities({ ...hotelAmenities, spa: e.target.checked })} />} label="Spa/Bath House" />
      <FormControlLabel control={<Switch checked={hotelAmenities.beach} onChange={(e) => setHotelAmenities({ ...hotelAmenities, beach: e.target.checked })} />} label="Plaj" />
      <FormControlLabel control={<Switch checked={hotelAmenities.honeymoonSuite} onChange={(e) => setHotelAmenities({ ...hotelAmenities, honeymoonSuite: e.target.checked })} />} label="Balayı Süiti" />
      <FormControlLabel control={<Switch checked={hotelAmenities.childFriendly} onChange={(e) => setHotelAmenities({ ...hotelAmenities, childFriendly: e.target.checked })} />} label="Çocuk Dostu" />
      <FormControlLabel control={<Switch checked={hotelAmenities.petFriendly} onChange={(e) => setHotelAmenities({ ...hotelAmenities, petFriendly: e.target.checked })} />} label="Hayvan Dostu" />
      <FormControlLabel control={<Switch checked={hotelAmenities.wifi} onChange={(e) => setHotelAmenities({ ...hotelAmenities, wifi: e.target.checked })} />} label="Wifi" />
      <FormControlLabel control={<Switch checked={hotelAmenities.safe} onChange={(e) => setHotelAmenities({ ...hotelAmenities, safe: e.target.checked })} />} label="Safe" />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Kaydet
      </Button>
    </Box>
  );
};

export default Admin;