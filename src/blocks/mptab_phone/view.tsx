import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import { MPTABDisplayPhone } from '../../display/mptab-display-phone'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-phone')
	elements.forEach((element) => {
		const root = createRoot(element!)
		root.render(
			<>
				<p>
					<MPTABDisplayPhone />
				</p>
			</>
		)
	})
})
