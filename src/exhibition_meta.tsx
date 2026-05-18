import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { MPTABExhibitionDate } from './input/mptab-exhibition-date'

domReady(() => {
	const root = createRoot(
		document.getElementById('mptab-exhibition-daterange')!,
	)

	//permanent
	const isPermanentInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition-is-permanent',
	)
	if (!isPermanentInput) {
		throw new Error('mptab-exhibition-is-permanent not found')
	}

	//date
	const mindateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition_date_start_field',
	)
	const maxdateInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition_date_end_field',
	)
	if (!mindateInput || !maxdateInput) {
		throw new Error('dates_field not found')
	}

	//alias
	const startAliasInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition_date_start_alias_field',
	)
	const endAliasInput: HTMLInputElement | null = document.querySelector(
		'#mptab-exhibition_date_end_alias_field',
	)
	if (!startAliasInput || !endAliasInput) {
		throw new Error('alias_field not found')
	}

	root.render(
		<>
			<MPTABExhibitionDate
				checkedInput={isPermanentInput}
				datesInput={[mindateInput, maxdateInput]}
				aliasInput={[startAliasInput, endAliasInput]}
			/>
		</>,
	)
})
