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
                    <div>Typescript, JavaScript, Python</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Web Dev</div>
                    <div>React, Vue, Django, Angular, Node</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">DevOps</div>
                    <div>Docker, Kubernetes, GCP, Heroku</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Database</div>
                    <div>MySQL, PostgreSQL, MongoDB</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">UX</div>
                    <div>Figma, InVision, Adobe XD</div>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="font-semibold text-gray-800">Practices</div>
                    <div>Scrum, Lean Startup, Design Sprints</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold tracking-widest text-emerald-700">PERSONAL DETAILS</h2>
                <div className="mt-3 space-y-3 text-sm text-gray-800">
                  <p>
                    Computer Engineer specialized in Web Development, 3 years of experience as a Backend Engineer, 6 years as a Frontend
                  </p>
                  <p>
                    Starting to work as a UX Designer with strong interest in user research, prototyping, user testing and hi‑fi interfaces
                  </p>
                  <p>
                    In charge of successfully delivering a Proof of Concept for a project funded by the European Space Agency
                  </p>
                  <p>
                    Capable of working on products end to end, from concept, research, prototyping to production
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
                      period: '2021 – 2024',
                      place: 'Remote',
                      title: 'Frontend & UX Engineer | Moodle, Open Learning Platform',
                      text:
                        'Deliver the frontend of the open source MoodleNet, using React and Storybook. Benchmarking and designing to develop new features'
                    },
                    {
                      period: '2014 – Present',
                      place: 'Remote',
                      title: 'Founder | Open Huts, Booking Platform for Nature Huts',
                      text:
                        'User research, prototyping, user testing, hi‑fi interfaces with Figma and implementation with Django, Docker, Heroku, Vue and Firebase'
                    },
                    {
                      period: '2018',
                      place: 'Lausanne, Switzerland',
                      title: 'Solution Architect | Wegaw, Terrain Monitoring for Outdoor Planning',
                      text:
                        'Analyze, develop and deliver a PoC, coordinating a consortium with SLF and ExoLabs. Django, Docker, Kubernetes'
                    },
                    {
                      period: '2017 – 2018',
                      place: 'Lausanne, Switzerland',
                      title: 'Web Developer | Pix4D, Photogrammetry for Construction and Agriculture',
                      text:
                        'Develop the new frontend, transforming UX designs to functional web apps. Angular 5, Django, RxJS, Redux'
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
                      { period: '2011 – 2016', title: "Engineer's Degree, Computer Engineering", place: 'Universitat de Barcelona' },
                      { period: '2020 – 2020', title: 'UX Designer Nanodegree', place: 'Udacity' },
                      { period: '2019 – 2021', title: 'UIMLA Mountain Leader, Alpine Hiking Guide', place: 'ICEMP' },
                      { period: '2020 – 2021', title: 'ThePowerMBA, MBA', place: 'ThePowerMBA' },
                      { period: '2009 – 2011', title: 'Architecture', place: 'Universitat Politècnica de Catalunya' }
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


