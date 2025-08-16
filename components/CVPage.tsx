import { Mail, Linkedin, Github } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function CVPage() {
  const location = useLocation()

  // Auto open print dialog when visiting /cv?download=1
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('download') === '1') {
      setTimeout(() => window.print(), 300)
    }
  }, [location.search])

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Print styles scoped to this page */}
      <style>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #a4-sheet { box-shadow: none !important; margin: 0 !important; }
        }
      `}</style>

      <div className="py-6 print:py-0 flex justify-center">
        {/* A4 sheet */}
        <div
          id="a4-sheet"
          className="bg-white text-gray-900 rounded-xl shadow-2xl print:rounded-none"
          style={{ width: '210mm', minHeight: '297mm' }}
        >
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">BRU MAS RIBERA</h1>
                <p className="text-sm md:text-base text-gray-700 mt-1">
                  Frontend & UX Engineer from Barcelona. Based in Meiringen, Switzerland
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="print:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: '#0ea5e9' }}
              >
                <span>Print / Save PDF</span>
              </button>
            </div>

            {/* Two columns: Skills & Tools | Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-8">
              <div>
                <h2 className="text-sm font-semibold tracking-widest text-emerald-700">SKILLS & TOOLS</h2>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Languages</div>
                    <div>TypeScript, JavaScript, Python, HTML/CSS</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Frontend</div>
                    <div>React, Next.js, Vue, Angular, Tailwind CSS</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Backend</div>
                    <div>Node.js, Django, Express, Supabase</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">DevOps</div>
                    <div>Docker, Kubernetes, GCP, Heroku, Vercel</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Database</div>
                    <div>PostgreSQL, MySQL, MongoDB, Firebase</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">UX Tools</div>
                    <div>Figma, Storybook, User Research, Prototyping</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Practices</div>
                    <div>Scrum, Lean Startup, Design Sprints, User Testing</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold tracking-widest text-emerald-700">PERSONAL DETAILS</h2>
                <div className="mt-3 space-y-2 text-sm text-gray-800">
                  <p>
                    Computer Engineer specialized in Web Development with 6 years Frontend and 3 years Backend experience
                  </p>
                  <p>
                    UX Designer with 3 years experience in user research, prototyping, and hi‑fi interfaces
                  </p>
                  <p>
                    Successfully delivered ESA-funded Proof of Concept, coordinating international consortiums
                  </p>
                  <p>
                    End-to-end product development from concept through prototyping to production deployment
                  </p>
                  <p>
                    Passionate about intuitive user experiences and bridging design-development gaps
                  </p>
                </div>
              </div>
            </div>

            {/* Experience - timeline */}
            <div className="mt-10">
              <h2 className="text-sm font-semibold tracking-widest text-emerald-700">PROFESSIONAL EXPERIENCE</h2>
              <div className="relative mt-4">
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gray-300" />
                <ul className="space-y-6">
                  {[
                    {
                      period: '2014 – Present',
                      place: 'Remote',
                      title: 'Founder & Project Lead | Open Huts, Booking Platform for Nature Huts',
                      text:
                        'Find hidden places to sleep out in the wild. Help protect nature by enjoying it. User research, prototyping, user testing, hi‑fi interfaces with Figma and implementation with React, Next.js, TypeScript, Supabase'
                    },
                    {
                      period: '2021 – 2024',
                      place: 'Remote',
                      title: 'Frontend & UX Engineer | Moodle, Open Learning Platform',
                      text:
                        'Developing MoodleNet, a network to share and curate open educational resources. Using React, Figma, UX Design, Open Source, Educational Technology'
                    },
                    {
                      period: '2020',
                      place: 'Lausanne, Switzerland',
                      title: 'User Experience Designer | Oberalp Group, Pomoca',
                      text:
                        'Redesigning the production interfaces of the ski touring skins world leader, Pomoca. Behavioral Interviewing, Usability Testing, UX Design, Production Interfaces'
                    },
                    {
                      period: '2018',
                      place: 'Lausanne, Switzerland',
                      title: 'Solution Architect | Wegaw, Terrain Monitoring for Outdoor Planning',
                      text:
                        'Developing an European Space Agency project to track snow cover from satellites worldwide. JavaScript, Kubernetes, Satellite Data, ESA Projects, Snow Cover Tracking'
                    },
                    {
                      period: '2017 – 2018',
                      place: 'Lausanne, Switzerland',
                      title: 'Junior Web Developer | Pix4D, Photogrammetry for Construction and Agriculture',
                      text:
                        'Developing a cloud platform to upload, process and analyze 3D models from drone images. Angular 4, RxJS, Cloud Platform, 3D Modeling, Drone Technology'
                    }
                  ].map((item, idx) => (
                    <li key={idx} className="relative pl-10 md:pl-14">
                      <div className="absolute left-4 md:left-6 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 shadow" />
                      <div className="text-xs text-gray-600 flex gap-3 flex-wrap">
                        <span>{item.period}</span>
                        <span>•</span>
                        <span>{item.place}</span>
                      </div>
                      <div className="font-semibold mt-1">{item.title}</div>
                      <p className="text-sm text-gray-800 mt-1 leading-relaxed">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education & languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10">
              <div>
                <h2 className="text-sm font-semibold tracking-widest text-emerald-700">EDUCATION</h2>
                <div className="relative mt-4">
                  <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gray-300" />
                  <ul className="space-y-6">
                    {[
                      { period: '2020 – 2021', title: 'MBA', place: 'ThePowerMBA' },
                      { period: '2020', title: 'User Experience Design', place: 'Udacity' },
                      { period: '2011 – 2016', title: 'BA Computer Engineering', place: 'Barcelona University' },
                      { period: '2009 – 2011', title: 'Architecture', place: 'UPC, Barcelona' }
                    ].map((edu, idx) => (
                      <li key={idx} className="relative pl-10 md:pl-14">
                        <div className="absolute left-4 md:left-6 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 shadow" />
                        <div className="text-xs text-gray-600">{edu.period}</div>
                        <div className="font-semibold mt-1">{edu.title}</div>
                        <div className="text-sm text-gray-800">{edu.place}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold tracking-widest text-emerald-700">LANGUAGES</h2>
                <div className="mt-3 text-sm text-gray-800 space-y-1">
                  <div>C2: English, French. Native: Spanish, Catalan</div>
                  <div>C1: Italian. B1: German, Portuguese</div>
                </div>

                <h2 className="text-sm font-semibold tracking-widest text-emerald-700 mt-6">INTERESTS</h2>
                <div className="mt-3 text-sm text-gray-800 space-y-1">
                  <div>Product Management, Business Development, Environment Restoration, Mountain Guiding</div>
                </div>

                <h2 className="text-sm font-semibold tracking-widest text-emerald-700 mt-6">SKILL SET</h2>
                <div className="mt-3 text-sm text-gray-800">Adobe Suite, Mountain Leader</div>
              </div>
            </div>

            {/* Footer contacts */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="text-gray-800">bru@masribera.com</div>
                <div className="flex items-center gap-4 text-gray-700">
                  <a href="mailto:bru@masribera.com" className="inline-flex items-center gap-1 hover:text-emerald-700"><Mail className="w-4 h-4" /> Email</a>
                  <a href="https://www.linkedin.com/in/brumasribera" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-emerald-700"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                  <a href="https://github.com/brumasribera" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-emerald-700"><Github className="w-4 h-4" /> GitHub</a>
                  <a href="https://bru.masribera.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-emerald-700">bru.masribera.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


