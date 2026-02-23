import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-ex-ev-dates')
	elements.forEach((element) => {
		const root = createRoot(element!)
		root.render(
			<>
				<p>hello</p>
			</>,
		)
	})
})
