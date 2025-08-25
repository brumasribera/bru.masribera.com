import React from 'react'
import { withPWASupport } from '../hocs/withPWASupport'

function PWADemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          PWA Demo Page
        </h1>
        <p className="text-gray-600 mb-6">
          This page automatically has PWA support! Try installing it as an app from your browser.
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            How it works:
          </h2>
          <ul className="text-left text-gray-600 space-y-2">
            <li>• Automatically detects the current route</li>
            <li>• Creates a route-specific PWA manifest</li>
            <li>• Adds all necessary PWA meta tags</li>
            <li>• Works on Android and iOS</li>
            <li>• Zero code duplication</li>
          </ul>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          When installed, this PWA will open directly to this page!
        </p>
      </div>
    </div>
  )
}

// Export with PWA support - just one line!
export default withPWASupport(PWADemoPage, {
  name: 'PWA Demo - Bru Mas Ribera',
  short_name: 'PWA Demo',
  description: 'A demonstration of automatic PWA support',
  categories: ['productivity', 'education']
})
