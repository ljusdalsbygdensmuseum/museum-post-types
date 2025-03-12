import { __ } from '@wordpress/i18n'
import { BaseControl } from '@wordpress/components'

import { MPTABTimeSelect } from '../components/mptab-time-select'
import { MPTABDateSelect } from '../components/mptab-date-select'
import { MPTABAlias } from '../components/mptab-alias'
import { HoursSchema } from '../types/mptab-hour-types'
import { isJSON } from '../utility/is-JSON'

interface Props {
	timeInput: HTMLInputElement
	datesInput: HTMLInputElement[]
	aliasInput: HTMLInputElement[]
}

export function MPTABEventDate({ timeInput, datesInput, aliasInput }: Props) {
	//Hours
	let hours = []
	if (
		isJSON(timeInput.value) &&
		HoursSchema.safeParse(JSON.parse(timeInput.value))
	) {
		hours = JSON.parse(timeInput.value)
	}
	return (
		<>
			<BaseControl label={__('Event Hours', 'mptab-domain')}>
				<MPTABTimeSelect hours={hours} input={timeInput} />
			</BaseControl>
			<BaseControl label={__('Event Dates', 'mptab-domain')}>
				<MPTABDateSelect dates={[]} input={datesInput} />
				<MPTABAlias
					element={[
						{
							id: 'mptab-event-date-alias',
							label: '',
							value: aliasInput[0].value,
							input: aliasInput[0],
						},
					]}
				/>
			</BaseControl>
		</>
	)
}
