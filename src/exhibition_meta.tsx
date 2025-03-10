import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import { MPTABDateRange } from './components/mptab-date-range'

domReady(() => {
	const root = createRoot(
		document.getElementById('mptab-exhibition-daterange')!
	)

	//date
	const mindateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition-date-start-field'
	)
	const maxdateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition-date-end-field'
	)
	if (!mindateInput || !maxdateInput) {
		throw new Error('dates_field not found')
	}

	let minDate = parseInt(mindateInput.value)
	if (minDate < 86400000) {
		minDate = new Date().getTime()
	}
	const maxDate = parseInt(maxdateInput.value)

	root.render(
		<>
			<MPTABDateRange
				dates={[minDate, maxDate]}
				input={[mindateInput, maxdateInput]}
			/>
		</>
	)
})
