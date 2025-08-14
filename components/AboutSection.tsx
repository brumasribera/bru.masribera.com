import { Card, CardContent } from './ui/card'
import { Code2, Palette, Users, Lightbulb } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 leading-tight pb-2">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-700/90 dark:text-gray-300/90 max-w-3xl mx-auto leading-relaxed">
            Computer Engineer building user‑centred products. 8y Frontend · 4y UX · 3y Backend. End‑to‑end from research to production —
            <span className="ml-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent font-semibold">
              impact‑driven
            </span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Frontend */}
          <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 transition-all">
            <Card className="relative rounded-2xl bg-white/75 dark:bg-gray-800/70 backdrop-blur-sm p-7 shadow-sm ring-1 ring-black/5 dark:ring-white/10 group-hover:shadow-xl group-hover:-translate-y-1 transition-all">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/30">
                  <Code2 className="h-8 w-8 text-emerald-700 dark:text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Frontend Development</h3>
                <p className="text-gray-600 dark:text-gray-400">React, TypeScript, performance & polished UI.</p>
              </CardContent>
            </Card>
          </div>

          {/* UX Design */}
          <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-fuchsia-500/20 via-pink-500/10 to-rose-500/20 transition-all">
            <Card className="relative rounded-2xl bg-white/75 dark:bg-gray-800/70 backdrop-blur-sm p-7 shadow-sm ring-1 ring-black/5 dark:ring-white/10 group-hover:shadow-xl group-hover:-translate-y-1 transition-all">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/40 dark:to-pink-900/30">
                  <Palette className="h-8 w-8 text-fuchsia-700 dark:text-fuchsia-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">UX Design</h3>
                <p className="text-gray-600 dark:text-gray-400">Research‑led, accessible and elegant flows.</p>
              </CardContent>
            </Card>
          </div>

          {/* User Research */}
          <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-indigo-500/20 transition-all">
            <Card className="relative rounded-2xl bg-white/75 dark:bg-gray-800/70 backdrop-blur-sm p-7 shadow-sm ring-1 ring-black/5 dark:ring-white/10 group-hover:shadow-xl group-hover:-translate-y-1 transition-all">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/30">
                  <Users className="h-8 w-8 text-violet-700 dark:text-violet-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Research</h3>
                <p className="text-gray-600 dark:text-gray-400">Interviews, surveys and data‑driven insights.</p>
              </CardContent>
            </Card>
          </div>

          {/* Innovation */}
          <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-rose-500/20 transition-all">
            <Card className="relative rounded-2xl bg-white/75 dark:bg-gray-800/70 backdrop-blur-sm p-7 shadow-sm ring-1 ring-black/5 dark:ring-white/10 group-hover:shadow-xl group-hover:-translate-y-1 transition-all">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30">
                  <Lightbulb className="h-8 w-8 text-amber-700 dark:text-amber-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">New tech and methods for sustainable impact.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
