"use client"; // This tells Next.js this component uses interactive client-side features like state

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(event.currentTarget);
    
    formData.append("access_key", "5be7f8de-f292-4fa6-8ab0-15d7268fd603"); 

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        (event.target as HTMLFormElement).reset(); // Clear the form
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Header Section */}
      <section className="bg-brand-blue text-brand-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Work With Me</h1>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <p className="text-xl text-gray-300 font-light">
              Partner with Dr. Dets for keynote speaking, policy consultation, or executive workshops.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 flex-grow">
        <ScrollReveal delay={0}>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,51,102,0.1)] border border-gray-100 p-8 md:p-12">
            
            <h2 className="text-2xl font-bold text-brand-blue mb-8 border-b-2 border-brand-pink pb-2 inline-block">
              Inquiry Form
            </h2>

            {/* Success Message Banner */}
            {submitStatus === "success" && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 animate-pulse">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <p className="font-medium">Thank you! Your inquiry has been sent successfully. I will be in touch soon.</p>
              </div>
            )}

            {/* Error Message Banner */}
            {submitStatus === "error" && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3 animate-pulse">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <p className="font-medium">Something went wrong. Please try again or email directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="First Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="Last Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="Email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                    placeholder="jane@organization.com"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-bold text-gray-700 mb-2">Organization</label>
                  <input 
                    type="text" 
                    id="organization"
                    name="Organization"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300"
                    placeholder="Company or Institution"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiryType" className="block text-sm font-bold text-gray-700 mb-2">Subject of Inquiry</label>
                <select 
                  id="inquiryType"
                  name="Inquiry Type"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300 text-gray-700 cursor-pointer"
                >
                  <option>Keynote Speaking Engagement</option>
                  <option>Policy & Workforce Consultation</option>
                  <option>Corporate Workshop / Training</option>
                  <option>Media or Press Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message Details</label>
                <textarea 
                  id="message"
                  name="Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Please share details about your event, timeline, or consultation needs..."
                ></textarea>
              </div>

              {/* Anti-spam honeypot (hidden from users) */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4 bg-brand-blue text-brand-white font-bold rounded-md hover:bg-brand-pink hover:text-brand-white md:hover:shadow-lg md:hover:-translate-y-1 active:scale-95 transition-all duration-300 group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Sending..." : "Send Inquiry"}</span>
                {!isSubmitting && (
                  <svg className="w-5 h-5 transform md:group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                )}
              </button>

            </form>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}