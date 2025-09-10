import React from 'react'

interface ReserveAppIframeProps {
	className?: string
	title?: string
	loading?: 'lazy' | 'eager'
	allow?: string
	sandbox?: string
}

export function ReserveAppIframe({ 
	className = "w-full h-full border-0", 
	title = "Reserve App",
	loading = "lazy",
	allow = "fullscreen",
	sandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
}: ReserveAppIframeProps) {
	// Determine the correct URL based on environment
	const getReserveAppUrl = () => {
		// Check if we're in development (localhost)
		if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
			return 'http://localhost:3002'
		}
		
		// Production URL - Reserve app deployed on Vercel
		return 'https://reserve-app-chi.vercel.app'
	}

	return (
		<iframe
			src={getReserveAppUrl()}
			className={className}
			title={title}
			loading={loading}
			allow={allow}
			sandbox={sandbox}
		/>
	)
}
