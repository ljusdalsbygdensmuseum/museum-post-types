import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import { MPTABDisplayAdress } from '../../display/mptab-display-adress'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-adress')
	elements.forEach((element) => {
		const root = createRoot(element!)
		root.render(
			<>
				<p>
					<MPTABDisplayAdress />
				</p>
			</>
		)
	})
})
