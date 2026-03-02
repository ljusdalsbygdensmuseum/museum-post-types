import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import MptabDisplayDates from '../../../src/display/mptab-display-dates'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-ex-ev-dates')
	//@ts-ignore
	elements.forEach((element: HTMLDivElement) => {
		const route = element.dataset.route
		if (!route) {
			console.log('no post route found')
			return
		}
		const root = createRoot(element!)
		root.render(
			<>
				<MptabDisplayDates route={route} />
			</>,
		)
	})
})
