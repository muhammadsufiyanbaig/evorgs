import React from 'react'
import ContactBanner from './Banner'
import ContactDetailsCard from './ContactDetailsCard'
import ContactForm from './ContactForm'
import DownloadBanner from '../LandingPage/DownloadBanner'

const ContactPage = () => {
  return (
    <div className=''>
        <ContactBanner />
        <ContactDetailsCard />
        <ContactForm />
    </div>
  )
}

export default ContactPage