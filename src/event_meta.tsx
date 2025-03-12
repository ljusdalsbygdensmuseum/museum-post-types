import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { MPTABEventDate } from './input/mptab-event-date-time'

domReady(() => {
	const root = createRoot(document.getElementById('mptab-event-date-select')!)
	//date
	const mindateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event-date-start-field'
	)
	const maxdateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event-date-end-field'
	)
	const alldateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event-date-all-field'
	)
	if (!mindateInput || !maxdateInput || !alldateInput) {
		throw new Error('dates_field not found')
	}

	//alias
	const startAliasInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event-date-alias-field'
	)
	if (!startAliasInput) {
		throw new Error('alias_field not found')
	}

	//time
	const timeInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event-time-field'
	)
	if (!timeInput) {
		throw new Error('mptab-event-time-field not found')
	}

	root.render(
		<>
			<MPTABEventDate
				timeInput={timeInput}
				datesInput={[alldateInput, mindateInput, maxdateInput]}
				aliasInput={[startAliasInput]}
			/>
		</>
	)
})
