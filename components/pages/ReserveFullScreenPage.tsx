import { ReserveAppIframe } from '../ui/ReserveAppIframe'

export function ReserveFullScreenPage() {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<ReserveAppIframe
				className="w-full h-full border-0"
				title="Reserve App - Full Screen"
			/>
		</div>
	)
}
