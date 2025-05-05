import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { MPTABMap } from './components/mptab-leaflet'
import { LatLngExpression } from 'leaflet'
import { isJSON } from './utility/is-JSON'

domReady(() => {
	const container = document.getElementById('mptab-settings-adress-map')
	if (!container) {
		return <p>Loading...</p>
	}
	const root = createRoot(container)

	let latlng: LatLngExpression = [51.505, -0.09]
	const search: HTMLInputElement | null = document.querySelector(
		'input[name="mptab_latlng"]'
	)
	if (search && isJSON(search.value)) {
		latlng = JSON.parse(search.value)
	}

	root.render(
		<>
			<MPTABMap searchable={false} location={latlng} searchInput={search} />
		</>
	)
})
