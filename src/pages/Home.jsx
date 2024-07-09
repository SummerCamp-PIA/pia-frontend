import React from 'react'
import HomeCard from '../components/HomeCard'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import FeatureBox from '../components/FeatureBox'

function Home() {
    return (
        <div>
            <NavBar />
            <HomeCard />
            <FeatureBox />
            <Footer />
        </div>
    )
}

export default Home