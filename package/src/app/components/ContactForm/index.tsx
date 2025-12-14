'use client'
import React, { useState, useEffect } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phnumber: '',
    Message: '',
  })
  const [showThanks, setShowThanks] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  // STRICT Validation Logic
  useEffect(() => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(formData.email)

   
    const isPhoneValid = formData.phnumber.length >= 10

    
    const areOthersValid = 
      formData.firstname.trim() !== '' &&
      formData.lastname.trim() !== '' &&
      formData.Message.trim() !== ''

    setIsFormValid(isEmailValid && isPhoneValid && areOthersValid)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // BLOCK Letters in Phone Number
    if (name === 'phnumber') {
      
      if (!/^[0-9+]*$/.test(value)) {
        return 
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  
  const reset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phnumber: '',
      Message: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoader(true)

    try {
      const response = await fetch('https://formsubmit.co/ajax/15971f795850a0e8e3cdb97cfeab6795', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
        body: JSON.stringify({
          Name: formData.firstname,
          LastName: formData.lastname,
          Email: formData.email,
          PhoneNo: formData.phnumber,
          Message: formData.Message,
        }),
      })

    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      
      if (data.success === 'true' || data.success === true) {
        setShowThanks(true)
        reset()
        setTimeout(() => {
          setShowThanks(false)
        }, 5000)
      } else {
        console.error('FormSubmit Error:', data)
        alert("Something went wrong. Please check your console.")
      }
    } catch (error) {
      console.error('Submission Error:', error)
      alert("Failed to send message. Please try again later.")
    } finally {
      setLoader(false) 
    }
  }

  return (
    <section id='contact' className='scroll-mt-12'>
      <div className='container'>
        <div className='relative'>
          <h2 className='mb-9 text-center'>Get in Touch</h2>
          <div className='relative border px-6 py-2 rounded-lg border-black/20 dark:border-white/20'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-wrap w-full m-auto justify-between'>
              
              <div className='sm:flex gap-6 w-full'>
                <div className='mx-0 my-2.5 flex-1'>
                  <label htmlFor='fname' className='pb-3 inline-block text-base'>
                    First Name
                  </label>
                  <input
                    id='fname'
                    type='text'
                    name='firstname'
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder='John'
                    className='w-full text-base px-4 rounded-lg border-black/20 dark:border-white/20 py-2.5 border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0 bg-transparent'
                  />
                </div>
                <div className='mx-0 my-2.5 flex-1'>
                  <label htmlFor='lname' className='pb-3 inline-block text-base'>
                    Last Name
                  </label>
                  <input
                    id='lname'
                    type='text'
                    name='lastname'
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder='Doe'
                    className='w-full text-base px-4 rounded-lg border-black/20 dark:border-white/20 py-2.5 border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0 bg-transparent'
                  />
                </div>
              </div>

              <div className='sm:flex gap-6 w-full'>
                <div className='mx-0 my-2.5 flex-1'>
                  <label htmlFor='email' className='pb-3 inline-block text-base'>
                    Email Address
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='john.doe@example.com'
                    // Visual feedback: Show red border if email is invalid but typed
                    className={`w-full text-base px-4 rounded-lg border-black/20 dark:border-white/20 py-2.5 border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0 bg-transparent ${
                        formData.email.length > 0 && !formData.email.includes('@') ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                <div className='mx-0 my-2.5 flex-1'>
                  <label htmlFor='Phnumber' className='pb-3 inline-block text-base'>
                    Phone Number
                  </label>
                  <input
                    id='Phnumber'
                    type='tel'
                    name='phnumber'
                    placeholder='+1234567890'
                    value={formData.phnumber}
                    onChange={handleChange}
                    maxLength={15} // Prevent crazy long numbers
                    className='w-full text-base px-4 py-2.5 rounded-lg border-black/20 dark:border-white/20 border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0 bg-transparent'
                  />
                </div>
              </div>

              <div className='w-full mx-0 my-2.5 flex-1'>
                <label htmlFor='message' className='text-base inline-block'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='Message'
                  value={formData.Message}
                  onChange={handleChange}
                  className='w-full mt-2 px-5 py-3 rounded-lg border-black/20 dark:border-white/20 border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0 bg-transparent'
                  placeholder='Anything else you wanna communicate'></textarea>
              </div>

              <div className='mx-0 my-2.5 w-full'>
                <button
                  type='submit'
                  disabled={!isFormValid || loader}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-lg transition-colors w-full sm:w-auto
                    ${
                      !isFormValid || loader
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                        : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                    }`}>
                  {loader ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
          
          {showThanks && (
            <div className='text-white bg-green-600 rounded-lg px-6 py-4 text-lg mb-4.5 mt-4 absolute bottom-0 right-0 flex items-center gap-2 shadow-xl'>
              Message Sent Successfully!
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm