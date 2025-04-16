import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import { MPTABDisplayMap } from '../../display/mptab-display-map'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-phone')
	elements.forEach((element) => {
		const root = createRoot(element!)
		root.render(
			<>
				<MPTABDisplayMap />
			</>
		)
	})
})
