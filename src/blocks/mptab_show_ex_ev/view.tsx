import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import { MPTABDisplayEvent } from '../../display/mptab-display-events'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-show-ex-ev')
	elements.forEach((element) => {
		const root = createRoot(element!)
		root.render(
			<>
				<MPTABDisplayEvent path='mptab/v1/current_exhibition_event' />
			</>
		)
	})
})
