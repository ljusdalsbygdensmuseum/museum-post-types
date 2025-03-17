import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { MPTABEventDate } from './input/mptab-event-date'
import { MPTABTimeSelect } from './components/mptab-time-select'

import { isJSON } from './utility/is-JSON'
import { HoursSchema } from './types/mptab-hour-types'

import './sass/post_edit/event_post_edit.scss'

domReady(() => {
	const root = createRoot(document.getElementById('mptab-event-date-select')!)
	const hourRoot = createRoot(
		document.getElementById('mptab-event-hour-select')!
	)
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

	root.render(
		<>
			<MPTABEventDate
				datesInput={[alldateInput, mindateInput, maxdateInput]}
				aliasInput={[startAliasInput]}
			/>
		</>
	)

	//Hours
	const timeInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event-time-field'
	)
	if (!timeInput) {
		throw new Error('mptab-event-time-field not found')
	}
	let hours = []
	if (
		isJSON(timeInput.value) &&
		HoursSchema.safeParse(JSON.parse(timeInput.value))
	) {
		hours = JSON.parse(timeInput.value)
	}

	hourRoot.render(
		<>
			<MPTABTimeSelect hours={hours} input={timeInput} />
		</>
	)
})
