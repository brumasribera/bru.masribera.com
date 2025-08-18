import React from 'react';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CVPage: React.FC = () => {
  const { t } = useTranslation('cv');
  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        {/* A4 Sheet Container - Professional formatting */}
        <div 
          id="a4-sheet"
          className="mx-auto bg-white shadow-lg max-w-[210mm] min-h-[297mm]"
          style={{
            width: '210mm',
            minHeight: '297mm',
            maxHeight: '297mm',
            background: 'white',
            overflow: 'hidden'
          }}
        >
                  {/* Professional A4 Layout with proper margins */}
        <div 
          className="p-8" 
          style={{ 
            padding: '10mm', 
            maxHeight: '277mm', 
            overflow: 'hidden',
            pageBreakAfter: 'avoid',
            pageBreakInside: 'avoid',
            breakAfter: 'avoid',
            breakInside: 'avoid'
          }}
        >
                          {/* Header - Professional with breathing room */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  {/* Profile Picture - Left Side */}
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg">
                      <img 
                        src="/profile/profile-cropped.jpg" 
                        alt="Bru Mas Ribera" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Title, Subtitle & Badges - Right Side */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('header.title')}</h1>
                    <p className="text-base text-gray-600 mb-3">{t('header.subtitle')}</p>
                    
                    {/* Professional badges */}
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {t('header.years')}
                      </div>
                      <a 
                        href="https://bru.masribera.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition-colors"
                      >
                        {t('header.website')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            {/* Skills & Tools | About - Professional spacing */}
            <div className="grid grid-cols-2 gap-6 mb-8 mt-8">
              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-2">
                  {t('sections.skillsTools')}
                </h2>
                <div className="space-y-2">
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">{t('labels.languages')}</span>
                    <span className="text-gray-600">{t('skills.languagesList')}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">{t('labels.frontend')}</span>
                    <span className="text-gray-600">{t('skills.frontendList')}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">{t('labels.backend')}</span>
                    <span className="text-gray-600">{t('skills.backendList')}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">{t('labels.uxTools')}</span>
                    <span className="text-gray-600">{t('skills.uxToolsList')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  {t('sections.about')}
                </h2>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 leading-tight">
                    {t('about.paragraph1')}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {t('about.paragraph2')}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Experience - Professional timeline */}
            <div className="mb-5">
                              <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-2">
                  {t('sections.professionalExperience')}
                </h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500"></div>
                
                {/* Experience Items - Professional spacing */}
                <div className="space-y-4">
                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">{t('experience.items.0.meta')}</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('experience.items.0.title')}</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      {t('experience.items.0.description')}
                    </p>
                  </div>

                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">{t('experience.items.1.meta')}</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('experience.items.1.title')}</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      {t('experience.items.1.description')}
                    </p>
                  </div>

                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">{t('experience.items.2.meta')}</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('experience.items.2.title')}</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      {t('experience.items.2.description')}
                    </p>
                  </div>

                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">{t('experience.items.3.meta')}</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('experience.items.3.title')}</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      {t('experience.items.3.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Languages/Interests/Skills - Professional layout */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  {t('sections.education')}
                </h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500"></div>
                  
                  <div className="space-y-4">
                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">{t('education.items.0.meta')}</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('education.items.0.title')}</h3>
                      <p className="text-xs text-gray-600">{t('education.items.0.place')}</p>
                    </div>

                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">{t('education.items.1.meta')}</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('education.items.1.title')}</h3>
                      <p className="text-xs text-gray-600">{t('education.items.1.place')}</p>
                    </div>

                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">{t('education.items.2.meta')}</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('education.items.2.title')}</h3>
                      <p className="text-xs text-gray-600">{t('education.items.2.place')}</p>
                    </div>

                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">{t('education.items.3.meta')}</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">{t('education.items.3.title')}</h3>
                      <p className="text-xs text-gray-600">{t('education.items.3.place')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  {t('sections.languages')}
                </h2>
                <div className="text-xs text-gray-600 mb-6">
                  <div className="mb-2" dangerouslySetInnerHTML={{ __html: t('languagesSection.lines.0') }} />
                  <div dangerouslySetInnerHTML={{ __html: t('languagesSection.lines.1') }} />
                </div>

                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  {t('sections.interests')}
                </h2>
                <div className="text-xs text-gray-600 mb-6">
                  <div className="mb-2">{t('interests.items.0')}</div>
                  <div>{t('interests.items.1')}</div>
                </div>

                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  {t('sections.skillSet')}
                </h2>
                <div className="text-xs text-gray-600 mb-6">
                  <div className="mb-2">{t('skillSet.items.0')}</div>
                  <div>{t('skillSet.items.1')}</div>
                </div>

                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  {t('sections.contact')}
                </h2>
                <div className="flex flex-wrap gap-3 text-xs mb-4">
                  <a href="mailto:bru@masribera.com" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span>{t('contact.email')}</span>
                  </a>
                  <a href="https://www.linkedin.com/in/brumasribera" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Linkedin className="h-3 w-3 flex-shrink-0" />
                    <span>{t('contact.linkedin')}</span>
                  </a>
                  <a href="https://github.com/brumasribera" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Github className="h-3 w-3 flex-shrink-0" />
                    <span>{t('contact.github')}</span>
                  </a>
                  <a href="https://bru.masribera.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <span>{t('contact.website')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-6 space-x-4">
          <a
            href={(() => {
              const match = window.location.pathname.match(/^\/(\w{2})(\/|$)/)
              const lng = match ? match[1] : 'en'
              return lng === 'en' ? '/documents/CV - Bru Mas Ribera.pdf' : `/documents/CV - Bru Mas Ribera (${lng.toUpperCase()}).pdf`
            })()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {t('actions.viewInBrowser')}
          </a>
          <a
            href={(() => {
              const match = window.location.pathname.match(/^\/(\w{2})(\/|$)/)
              const lng = match ? match[1] : 'en'
              return lng === 'en' ? '/documents/CV - Bru Mas Ribera.pdf' : `/documents/CV - Bru Mas Ribera (${lng.toUpperCase()}).pdf`
            })()}
            download={(() => {
              const match = window.location.pathname.match(/^\/(\w{2})(\/|$)/)
              const lng = match ? match[1] : 'en'
              return lng === 'en' ? 'CV - Bru Mas Ribera.pdf' : `CV - Bru Mas Ribera (${lng.toUpperCase()}).pdf`
            })()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('actions.downloadPdf')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CVPage;


