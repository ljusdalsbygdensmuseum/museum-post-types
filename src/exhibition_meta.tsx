import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import { MPTABDateRange } from './components/mptab-date-range'
import { MPTABAlias } from './components/mptab-alias'
import { __ } from '@wordpress/i18n'

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

	const minDate = parseInt(mindateInput.value)
	const maxDate = parseInt(maxdateInput.value)

	//alias
	const startAliasInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition-date-start-alias-field'
	)
	const endAliasInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition-date-end-alias-field'
	)
	if (!startAliasInput || !endAliasInput) {
		throw new Error('alias_field not found')
	}

	const startAlias = startAliasInput.value
	const endAlias = endAliasInput.value

	root.render(
		<>
			<MPTABDateRange
				dates={[minDate, maxDate]}
				input={[mindateInput, maxdateInput]}
			/>
			<MPTABAlias
				element={[
					{
						id: 'mptab-exhibition-date-start-alias',
						label: __('Start alias', 'mptab-domain'),
						value: startAlias,
						input: startAliasInput,
					},
					{
						id: 'mptab-exhibition-date-end-alias',
						label: __('End alias', 'mptab-domain'),
						value: endAlias,
						input: endAliasInput,
					},
				]}
			/>
		</>
	)
})
