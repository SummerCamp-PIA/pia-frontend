import React from 'react'
import NavBar from '../components/NavBar'
import HomeFilter from '../components/HomeFilter'
import Footer from '../components/Footer'
import HotelList from '../components/HotelList'

function Hotels() {
    return (
        <div>
            <NavBar />
            <HomeFilter />
            <HotelList />
            <Footer />
        </div>
    )
}

export default Hotels