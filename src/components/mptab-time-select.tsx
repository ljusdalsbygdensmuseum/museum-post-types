import {
	Button,
	TimePicker,
	Flex,
	FlexItem,
	FlexBlock,
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import { useState } from 'react'

import { Hour, TimeInputValue } from '../types/mptab-hour-types'

interface Props {
	hours: Hour[]
	input: HTMLInputElement
}

export function MPTABTimeSelect({ hours, input }: Props) {
	const [allHours, setAllHours] = useState(hours)
	const theHours = allHours.map((hour: Hour, index) => {
		const removeItem = () => {
			setAllHours((oldHours) => {
				const newHours = oldHours.concat()
				newHours.splice(index, 1)
				input.value = JSON.stringify(newHours)
				return newHours
			})
		}

		const changeItem = (newTime: TimeInputValue, open: boolean) => {
			setAllHours((oldHours) => {
				const newHours = oldHours.concat([])
				if (open) {
					newHours[index].open = newTime
				} else if (!open) {
					newHours[index].close = newTime
				}
				input.value = JSON.stringify(newHours)
				return newHours
			})
		}

		return (
			<>
				<Flex>
					<FlexItem>
						<TimePicker.TimeInput
							label={__('Start', 'mptab-domain')}
							value={hour.open}
							onChange={(newTime) => {
								changeItem(newTime, true)
							}}
						/>
					</FlexItem>
					<FlexItem>
						<TimePicker.TimeInput
							label={__('End', 'mptab-domain')}
							value={hour.close}
							onChange={(newTime) => {
								changeItem(newTime, false)
							}}
						/>
					</FlexItem>
					<FlexBlock>
						<Button
							isDestructive
							variant='tertiary'
							onClick={() => {
								removeItem()
							}}
						>
							{__('Remove', 'flexible-open-hours-domain')}
						</Button>
					</FlexBlock>
				</Flex>
			</>
		)
	})

	return (
		<>
			{theHours}
			{allHours.length < 4 && (
				<Button
					variant='secondary'
					onClick={() => {
						setAllHours((oldHours) => {
							const newHours = [
								...oldHours,
								{
									open: {
										hours: 0,
										minutes: 0,
									},
									close: {
										hours: 0,
										minutes: 0,
									},
								},
							]
							input.value = JSON.stringify(newHours)
							return newHours
						})
					}}
				>
					{__('Add More', 'mptab-domain')}
				</Button>
			)}
		</>
	)
}
