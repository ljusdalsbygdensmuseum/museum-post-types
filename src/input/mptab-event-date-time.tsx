import { __ } from '@wordpress/i18n'
import { BaseControl } from '@wordpress/components'

import { MPTABDateSelect } from '../components/mptab-date-select'
import { MPTABAlias } from '../components/mptab-alias'

interface Props {
	timeInput: HTMLInputElement
	datesInput: HTMLInputElement[]
	aliasInput: HTMLInputElement[]
}

export function MPTABEventDate({ timeInput, datesInput, aliasInput }: Props) {
	return (
		<>
			<BaseControl label={__('Event Dates', 'mptab-domain')}>
				<MPTABDateSelect dates={[]} input={datesInput} />
				<MPTABAlias
					element={[
						{
							id: 'mptab-event-date-alias',
							label: __('Start alias', 'mptab-domain'),
							value: aliasInput[0].value,
							input: aliasInput[0],
						},
					]}
				/>
			</BaseControl>
		</>
	)
}
