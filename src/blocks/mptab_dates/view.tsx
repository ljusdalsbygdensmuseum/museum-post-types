import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { DatesSchema } from '../../../src/types/mptab-date-types'

domReady(() => {
	const elements = document.querySelectorAll('.wp-block-mptab-ex-ev-dates')
	//@ts-ignore
	elements.forEach((element: HTMLDivElement) => {
		if (DatesSchema.safeParse(element.dataset.dates).success) {
			console.log(DatesSchema.parse(element.dataset.dates))
		} else {
			console.log(DatesSchema.safeParse(element.dataset.dates))
		}

		const root = createRoot(element!)
		root.render(
			<>
				<p>hello</p>
			</>,
		)
	})
})
