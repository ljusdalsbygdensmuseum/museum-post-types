import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { MPTABMap } from './components/mptab-leaflet'

domReady(() => {
	const container = document.getElementById('mptab-settings-adress-map')
	if (!container) {
		return <p>Loading...</p>
	}
	const root = createRoot(container)

	root.render(
		<>
			<MPTABMap key={123} location={[51.505, -0.09]} />
		</>
	)
})
