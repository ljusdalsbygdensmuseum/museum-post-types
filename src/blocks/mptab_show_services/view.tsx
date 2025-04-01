import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import { MPTABDisplayServices } from '../../display/mptab-display-services'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-show-services')
	elements.forEach((element) => {
		const root = createRoot(element!)
		root.render(
			<>
				<MPTABDisplayServices />
			</>
		)
	})
})
