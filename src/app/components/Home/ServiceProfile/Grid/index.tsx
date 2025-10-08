import React from 'react'
import LeftSection from '../LeftSection'
import RightSection from '../RIghtSection/Index'

interface GridProps {
  serviceId?: string;
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | null;
}

const Grid = ({ serviceId, serviceData, serviceType }: GridProps) => {
  return (
    <div className='container py-8'>
        <div className="flex flex-col lg:flex-row gap-6">
            <LeftSection serviceData={serviceData} serviceType={serviceType} />
            <RightSection serviceData={serviceData} serviceType={serviceType} />
        </div>
    </div>
  )
}

export default Grid