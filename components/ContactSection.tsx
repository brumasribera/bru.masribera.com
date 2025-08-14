import { Mail, Linkedin, Github, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await emailjs.send(
        'service_2u98nps', // Your EmailJS service ID
        'template_rsgbpt7', // Your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString()
        },
        'Pq1K7CO2PNmSWgNel' // Your EmailJS public key
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setShowSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        
        // Start fade-out animation after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
          // Hide message completely after animation
          setTimeout(() => {
            setSubmitStatus('idle')
          }, 300)
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Email send error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Professional header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent leading-tight pb-2">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I'm always open to meaningful collaborations and exciting opportunities. 
            Let's build something amazing together.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <div className="space-y-8">
            {/* Call to action merged with form header */}
            <div className="text-center p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 mb-8">
              <MessageCircle className="h-10 w-10 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Send me a message
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Let's discuss your next project. Whether it's collaboration, consultation, or just a conversation - I'm here to help.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none"
                  placeholder="Tell me about your project, collaboration idea, or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  showSuccess 
                    ? 'max-h-20 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-center">
                    <div className="text-base font-medium">🎉 Message sent successfully!</div>
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-center">
                  <div className="text-lg font-medium mb-1">❌ Failed to send message</div>
                  <div className="text-sm">Please try again or use the email button below.</div>
                </div>
              )}
            </form>

            {/* Contact buttons */}
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-4">
                {/* Email */}
                <button 
                  onClick={() => window.open('mailto:bru@masribera.com','_blank')}
                  className="group bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  bru@masribera.com
                </button>
                
                {/* LinkedIn */}
                <button 
                  onClick={() => window.open('https://linkedin.com/in/brumasribera','_blank')}
                  className="group bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </button>
                
                {/* GitHub */}
                <button 
                  onClick={() => window.open('https://github.com/brumasribera','_blank')}
                  className="group bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
