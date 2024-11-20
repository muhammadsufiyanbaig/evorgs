import React from 'react'
import Gallery from './Gallery'
import Overview from './Overview'
import Available from './Available'
import Map from './Map'
import Amenities from './Amenities'
import Reviews from './Reviews'

const Details = () => {
  return (
    <div className='px-4 lg:px-10'>
        <Gallery />  
        <Overview/>
        <Available />
        <Map />
        <Amenities />
        <Reviews />
    </div>
  )
}

export default Details