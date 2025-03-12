import { useState } from 'react'
import { __ } from '@wordpress/i18n'
import { BaseControl, ToggleControl } from '@wordpress/components'

import { MPTABDateRange } from '../components/mptab-date-range'
import { MPTABAlias } from '../components/mptab-alias'

interface Props {
	checkedInput: HTMLInputElement
	datesInput: HTMLInputElement[]
	aliasInput: HTMLInputElement[]
}

export function MPTABExhibitionDate({
	checkedInput,
	datesInput,
	aliasInput,
}: Props) {
	const [isChecked, setIsChecked] = useState(checkedInput.checked)

	return (
		<>
			<ToggleControl
				label={__('Permanent exhibition', 'mptab-domain')}
				checked={isChecked}
				onChange={() => {
					setIsChecked((state) => {
						checkedInput.checked = !state
						return !state
					})
				}}
			/>

			{isChecked ? (
				''
			) : (
				<>
					<BaseControl label={__('Exhibition Dates', 'mptab-domain')}>
						<MPTABDateRange
							dates={[
								parseInt(datesInput[0].value),
								parseInt(datesInput[1].value),
							]}
							input={datesInput}
						/>
						<MPTABAlias
							element={[
								{
									id: 'mptab-exhibition-date-start-alias',
									label: __('Start alias', 'mptab-domain'),
									value: aliasInput[0].value,
									input: aliasInput[0],
								},
								{
									id: 'mptab-exhibition-date-end-alias',
									label: __('End alias', 'mptab-domain'),
									value: aliasInput[1].value,
									input: aliasInput[1],
								},
							]}
						/>
					</BaseControl>
				</>
			)}
		</>
	)
}
