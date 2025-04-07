import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

domReady(() => {
	const root = createRoot(document.getElementById('mptab-settings-adress-map')!)

	root.render(
		<>
			<p>hello</p>
		</>
	)
})
