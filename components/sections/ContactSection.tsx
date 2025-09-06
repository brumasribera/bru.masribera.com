import { Linkedin, Github, MessageCircle, Send, Mail } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'


export function ContactSection() {
  const { t } = useTranslation(['home'])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showSuccess, setShowSuccess] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check consent before submitting
    if (!consentGiven) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Basic client-side validation and sanitization
      const sanitizedData = {
        name: formData.name.trim().substring(0, 100), // Limit name length
        email: formData.email.trim().substring(0, 255), // Limit email length
        message: formData.message.trim().substring(0, 2000), // Limit message length
        time: new Date().toLocaleString()
      }
      
      const result = await emailjs.send(
        'service_2u98nps', // Your EmailJS service ID
        'template_rsgbpt7', // Your EmailJS template ID
        sanitizedData,
        'Pq1K7CO2PNmSWgNel' // Your EmailJS public key
      )

      console.log('EmailJS result:', result)

      // EmailJS returns status 200 for success, but let's also check for text property
      if (result.status === 200 || result.text === 'OK') {
        setSubmitStatus('success')
        setShowSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setConsentGiven(false) // Reset consent for security
        
        // Start fade-out animation after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
          // Hide message completely after animation
          setTimeout(() => {
            setSubmitStatus('idle')
          }, 300)
        }, 3000)
      } else {
        console.error('EmailJS error:', result)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Email send error:', error)
      // Check if it's a specific EmailJS error
      if (error instanceof Error) {
        console.error('Error details:', error.message)
      }
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Get In Touch header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#20C997] leading-tight pb-2">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <div className="space-y-8">
            {/* Message section */}
            <div className="text-center p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 mb-8">
              <MessageCircle className="h-10 w-10 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {t('contact.formTitle')}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {t('contact.formDescription')}
              </p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('contact.consent')}
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-300 hover:via-emerald-400 hover:to-teal-400 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-700 to-teal-600 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>{t('contact.send')}</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className={`transition-all duration-300 ease-in-out ${
                showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-center">
                  <div className="text-base font-medium">🎉 {t('contact.success')}</div>
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-center">
                <div className="text-lg font-medium mb-1">
                  ❌ {!consentGiven ? t('contact.consentRequired') : t('contact.error')}
                </div>
              </div>
            )}
          </div>

          {/* Alternative Contact Methods */}
          <div className="text-center mt-12">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="group bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 transition-colors duration-200 text-base"
                onClick={() => window.open('mailto:bru@masribera.com', '_blank')}
              >
                <Mail className="mr-2 h-4 w-4 transition-all duration-300 group-hover:scale-110" />
                bru@masribera.com
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 text-base shadow-md"
                onClick={() => window.open('https://linkedin.com/in/brumasribera', '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4 transition-all duration-500 group-hover:fill-current group-hover:scale-110" />
                LinkedIn
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 text-base shadow-md"
                onClick={() => window.open('https://github.com/brumasribera', '_blank')}
              >
                <Github className="mr-2 h-4 w-4 transition-all duration-500 group-hover:fill-current group-hover:scale-110" />
                GitHub
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 text-base shadow-md"
                onClick={() => {
                  const match = window.location.pathname.match(/^\/(\w{2})(\/|$)/)
                  const lng = match ? match[1] : 'en'
                  const url = lng === 'en' ? '/documents/CV - Bru Mas Ribera.pdf' : `/documents/CV - Bru Mas Ribera (${lng.toUpperCase()}).pdf`
                  window.open(url, '_blank')
                }}
              >
                <svg className="mr-2 h-4 w-4 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
