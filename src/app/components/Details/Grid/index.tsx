import React from 'react'
import LeftSection from '../LeftSection'
import RightSection from '../RIghtSection/Index'

const Grid = () => {
  return (
    <div className='container py-8'>
        <div className="flex flex-col lg:flex-row gap-6">
            <LeftSection />
            <RightSection />
        </div>
    </div>
  )
}

export default Grid