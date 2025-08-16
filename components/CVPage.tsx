import React from 'react';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';

const CVPage: React.FC = () => {
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
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">BRU MAS RIBERA</h1>
                <p className="text-base text-gray-600 mb-3">Frontend & UX Engineer from Barcelona. Based in Meiringen, Switzerland</p>
                
                {/* Professional badges */}
                <div className="flex justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  8+ years of professional experience
                </div>
                <a 
                  href="https://bru.masribera.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition-colors"
                >
                  Website
                </a>
              </div>
            </div>

            {/* Skills & Tools | About - Professional spacing */}
            <div className="grid grid-cols-2 gap-6 mb-8 mt-8">
              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-2">
                  Skills & Tools
                </h2>
                <div className="space-y-2">
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">Languages</span>
                    <span className="text-gray-600">TypeScript, JavaScript, Python</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">Frontend</span>
                    <span className="text-gray-600">React, Next.js, Vue, Tailwind CSS</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">Backend</span>
                    <span className="text-gray-600">Node.js, Django, Supabase</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                    <span className="font-semibold text-gray-700">UX Tools</span>
                    <span className="text-gray-600">Figma, Storybook, User Research</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  About Me
                </h2>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 leading-tight">
                    Computer Engineer specialized in Web Development with 6 years Frontend and 3 years Backend experience. UX Designer with 3 years experience.
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Successfully delivered ESA-funded Proof of Concept, coordinating international consortiums.
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Experience - Professional timeline */}
            <div className="mb-5">
                              <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-2">
                  Professional Experience
                </h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500"></div>
                
                {/* Experience Items - Professional spacing */}
                <div className="space-y-4">
                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">2014 – Present • Remote</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">Founder & Project Lead | Open Huts, Booking Platform for Nature Huts</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      Find hidden places to sleep out in the wild. Help protect nature by enjoying it. User research, prototyping, user testing, hi‑fi interfaces with Figma and implementation with React, Next.js, TypeScript, Supabase
                    </p>
                  </div>

                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">2021 – 2024 • Remote</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">Frontend & UX Engineer | Moodle, Open Learning Platform</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      Developing MoodleNet, a network to share and curate open educational resources. Using React, Figma, UX Design, Open Source, Educational Technology
                    </p>
                  </div>

                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">2020 • Lausanne, Switzerland</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">User Experience Designer | Oberalp Group, Pomoca</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      Redesigning the production interfaces of the ski touring skins world leader, Pomoca. Behavioral Interviewing, Usability Testing, UX Design, Production Interfaces
                    </p>
                  </div>

                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">2018 • Lausanne, Switzerland</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">Solution Architect | Wegaw, Terrain Monitoring for Outdoor Planning</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      Developing an European Space Agency project to track snow cover from satellites worldwide. JavaScript, Kubernetes, Satellite Data, ESA Projects, Snow Cover Tracking
                    </p>
                  </div>

                  <div className="relative" style={{ paddingLeft: '3rem' }}>
                    <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                    <div className="text-xs text-gray-500 mb-1">2017 – 2018 • Remote</div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">Junior Web Developer | Pix4D, Photogrammetry for Construction and Agriculture</h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      Developing a cloud platform to upload, process and analyze 3D models from drone images. Angular 4, RxJS, Cloud Platform, 3D Modeling, Drone Technology
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Languages/Interests/Skills - Professional layout */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  Education
                </h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500"></div>
                  
                  <div className="space-y-4">
                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">2020 – 2021</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">MBA</h3>
                      <p className="text-xs text-gray-600">ThePowerMBA</p>
                    </div>

                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">2020</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">User Experience Design</h3>
                      <p className="text-xs text-gray-600">Udacity</p>
                    </div>

                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">2014 – 2018</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">BA Computer Engineering</h3>
                      <p className="text-xs text-gray-600">Barcelona University</p>
                    </div>

                    <div className="relative" style={{ paddingLeft: '3rem' }}>
                      <div className="absolute top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ left: '10px' }}></div>
                      <div className="text-xs text-gray-500 mb-1">2014 – 2018</div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">Architecture</h3>
                      <p className="text-xs text-gray-600">UPC, Barcelona</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  Languages
                </h2>
                <div className="text-xs text-gray-600 mb-6">
                  <div className="mb-2">
                    <span className="font-semibold">C2:</span> English, French • <span className="font-semibold">Native:</span> Spanish, Catalan
                  </div>
                  <div>
                    <span className="font-semibold">C1:</span> Italian • <span className="font-semibold">B1:</span> German, Portuguese
                  </div>
                </div>

                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  Interests
                </h2>
                <div className="text-xs text-gray-600 mb-6">
                  <div className="mb-2">Business Development</div>
                  <div>Environment Restoration</div>
                </div>

                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  Skill Set
                </h2>
                <div className="text-xs text-gray-600 mb-6">
                  <div className="mb-2">UIMLA Mountain Leader</div>
                  <div>User Research & Testing</div>
                </div>

                <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  Contact
                </h2>
                <div className="flex flex-wrap gap-3 text-xs mb-4">
                  <a href="mailto:bru@masribera.com" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span>Email</span>
                  </a>
                  <a href="https://www.linkedin.com/in/brumasribera" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Linkedin className="h-3 w-3 flex-shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://github.com/brumasribera" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Github className="h-3 w-3 flex-shrink-0" />
                    <span>GitHub</span>
                  </a>
                  <a href="https://bru.masribera.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 flex items-center gap-1">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <span>bru.masribera.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-6 space-x-4">
          <a
            href="/documents/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View CV in Browser
          </a>
          <a
            href="/documents/cv.pdf"
            download="Bru_Mas_Ribera_CV.pdf"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download CV PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default CVPage;


