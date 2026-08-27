export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Header Section */}
      <section className="bg-brand-blue text-brand-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Work With Me</h1>
          <p className="text-xl text-gray-300 font-light">
            Partner with Dr. Dets for keynote speaking, policy consultation, or executive workshops.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 flex-grow">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,51,102,0.1)] border border-gray-100 p-8 md:p-12">
          
          <h2 className="text-2xl font-bold text-brand-blue mb-8 border-b-2 border-brand-pink pb-2 inline-block">
            Inquiry Form
          </h2>

          <form className="space-y-6">
            
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email & Organization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                  placeholder="jane@organization.com"
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-bold text-gray-700 mb-2">Organization</label>
                <input 
                  type="text" 
                  id="organization"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                  placeholder="Company or Institution"
                />
              </div>
            </div>

            {/* Inquiry Type Dropdown */}
            <div>
              <label htmlFor="inquiryType" className="block text-sm font-bold text-gray-700 mb-2">Subject of Inquiry</label>
              <select 
                id="inquiryType"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300 text-gray-700"
              >
                <option>Keynote Speaking Engagement</option>
                <option>Policy & Workforce Consultation</option>
                <option>Corporate Workshop / Training</option>
                <option>Media or Press Inquiry</option>
                <option>Other</option>
              </select>
            </div>

            {/* Message Area */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message Details</label>
              <textarea 
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Please share details about your event, timeline, or consultation needs..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-brand-blue text-brand-white font-bold rounded-md hover:bg-brand-pink hover:text-brand-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center gap-2"
            >
              <span>Send Inquiry</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>

          </form>
        </div>
      </section>
    </div>
  );
}