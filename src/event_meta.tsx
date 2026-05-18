import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { MPTABEventDate } from './input/mptab-event-date'
import { MPTABTimeSelect } from './components/mptab-time-select'

import { isJSON } from './utility/is-JSON'
import { HoursSchema } from './types/mptab-hour-types'

//import './sass/post_edit/event_post_edit.scss'

domReady(() => {
	const root = createRoot(document.getElementById('mptab-event-date-select')!)
	const hourRoot = createRoot(
		document.getElementById('mptab-event-hour-select')!,
	)
	//date
	const mindateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event_date_start_field',
	)
	const maxdateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event_date_end_field',
	)
	const alldateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event_date_all_field',
	)
	if (!mindateInput || !maxdateInput || !alldateInput) {
		throw new Error('dates_field not found')
	}

	//alias
	const startAliasInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event_date_alias_field',
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
		</>,
	)

	//Hours
	const hourInput: HTMLInputElement | null = document.querySelector(
		'#mptab-event_hour_field',
	)
	if (!hourInput) {
		throw new Error('mptab-event-hour-field not found')
	}
	let hours = []
	if (
		isJSON(hourInput.value) &&
		HoursSchema.safeParse(JSON.parse(hourInput.value))
	) {
		hours = JSON.parse(hourInput.value)
	}

	hourRoot.render(
		<>
			<MPTABTimeSelect hours={hours} input={hourInput} />
		</>,
	)
})
