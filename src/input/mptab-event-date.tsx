import { MPTABDateSelect } from '../components/mptab-date-select'
import { MPTABAlias } from '../components/mptab-alias'

import { isJSON } from '../utility/is-JSON'

import { DatesSchema } from '../types/mptab-date-types'

interface Props {
	datesInput: HTMLInputElement[]
	aliasInput: HTMLInputElement[]
}

export function MPTABEventDate({ datesInput, aliasInput }: Props) {
	if (!datesInput[0]) {
		throw new Error('mptab-event-time-field not found')
	}
	let dates = []
	if (
		isJSON(datesInput[0].value) &&
		DatesSchema.safeParse(JSON.parse(datesInput[0].value))
	) {
		dates = JSON.parse(datesInput[0].value)
	}
	return (
		<>
			<MPTABDateSelect dates={dates} input={datesInput} />
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
		</>
	)
}
