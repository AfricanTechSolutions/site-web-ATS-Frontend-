import React from 'react'

const Contact = () => {
  return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
          <div className="relative z-0 w-full max-w-6xl bg-white shadow-xl rounded-lg p-6 sm:p-10">
            
            {/* Background design */}
            <div className="bg-blue-400 w-32 h-32 absolute z-0 rounded-3xl top-[-40px] left-[-40px]"></div>
    
            {/* Header */}
            <div className="text-center relative z-10 mb-10">
              <h1 className="text-3xl font-bold">Nous contacter</h1>
              <p className="text-gray-500">Enoyez nous un message et nous vous contacterons</p>
            </div>
    
            {/* Body */}
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 relative z-10">
              
              {/* Email login form */}
              <div className="w-full max-w-md bg-white rounded-md shadow-2xl p-6">
                <form className="flex flex-col gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Entrez votre adresse email"
                      className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="message" className="mb-1 font-medium">Message</label>
                    <textarea
                      id="message"
                      name='message'
                      rows={6}
                      placeholder="Entrez votre message ici"
                      className="w-full border border-blue-400 h-30 rounded-md px-3 focus:outline-blue-500 p-3 text-xl text-gray-700"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled
                    className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full mt-4 self-end hover:bg-blue-700 hover:scale-105 duration-200"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Contact