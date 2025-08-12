import { Card, CardContent } from './ui/card'
import { Code2, Palette, Users, Lightbulb } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-700/90 dark:text-gray-300/90 max-w-4xl mx-auto leading-relaxed">
            Determined to protect the planet and its richness, I am always open to take on new challenges that aim for the
            highest positive impact on our Earth.
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Trained as a Computer Engineer, I specialized in web development. I’ve worked 8 years as a Frontend Engineer,
            4 years as a User Experience Designer, and 3 years as a Backend Engineer—giving me the ability to build
            products end‑to‑end: from research and prototyping to production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-100/80 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Frontend Development</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Modern, responsive apps with React, TypeScript and high‑quality UI engineering.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-green-100/80 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Palette className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">UX Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intuitive, accessible experiences informed by research, prototyping and testing.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-purple-100/80 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Research</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interviews, surveys and data to guide product direction and validate decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-orange-100/80 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Lightbulb className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                New technologies and methodologies to unlock meaningful, sustainable impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
