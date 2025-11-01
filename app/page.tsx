'use client'

import { useState } from 'react'
import { Bot, Code, Smartphone, Globe, Shield, Cog, Cloud, Brain, BarChart, Radio, Glasses, Link2, MessageSquare, Palette, Briefcase, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

const services = [
  { id: 1, name: 'AI Calling Agent', icon: Bot, description: 'Intelligent voice automation' },
  { id: 2, name: 'Game Development', icon: Code, description: 'Immersive gaming experiences' },
  { id: 3, name: 'Mobile App Development', icon: Smartphone, description: 'iOS & Android solutions' },
  { id: 4, name: 'Full-Stack Web Development', icon: Globe, description: 'Complete web solutions' },
  { id: 5, name: 'Cybersecurity Solutions', icon: Shield, description: 'Advanced security systems' },
  { id: 6, name: 'Robotic Process Automation', icon: Cog, description: 'Workflow automation' },
  { id: 7, name: 'Cloud Computing Solutions', icon: Cloud, description: 'Scalable cloud infrastructure' },
  { id: 8, name: 'AI & ML Development', icon: Brain, description: 'Machine learning models' },
  { id: 9, name: 'Data Analytics & BI', icon: BarChart, description: 'Business intelligence' },
  { id: 10, name: 'IoT Development', icon: Radio, description: 'Connected device solutions' },
  { id: 11, name: 'VR/AR Solutions', icon: Glasses, description: 'Virtual & augmented reality' },
  { id: 12, name: 'Blockchain Development', icon: Link2, description: 'Decentralized applications' },
  { id: 13, name: 'AI Chatbot Development', icon: MessageSquare, description: 'Conversational AI' },
  { id: 14, name: 'UX/UI Design', icon: Palette, description: 'User-centric design' },
  { id: 15, name: 'Business Automation', icon: Briefcase, description: 'Process optimization' },
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    services: [] as number[],
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleServiceToggle = (serviceId: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          services: [],
          message: '',
        })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to submit. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 mr-3 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold">Alfox.ai</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Next-Generation Technology Solutions for Modern Businesses
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Transform your business with cutting-edge AI, development, and automation solutions
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Our Services</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Select the services you're interested in
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = formData.services.includes(service.id)

            return (
              <button
                key={service.id}
                onClick={() => handleServiceToggle(service.id)}
                className={`p-6 rounded-xl transition-all duration-300 text-left ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-xl transform scale-105'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-105'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  {isSelected && <CheckCircle className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Get Started Today</h2>
          <p className="text-gray-600 mb-8 text-center">
            Fill out the form below and we'll get back to you within 24 hours
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Details
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                placeholder="Tell us about your project requirements..."
              />
            </div>

            {formData.services.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Selected Services ({formData.services.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map(id => {
                    const service = services.find(s => s.id === id)
                    return (
                      <span key={id} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                        {service?.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Thank you! We'll be in touch shortly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {status === 'loading' ? (
                'Submitting...'
              ) : (
                <>
                  Submit Inquiry
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-2" />
            <h3 className="text-2xl font-bold">Alfox.ai</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering businesses with next-generation technology solutions
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Alfox.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
