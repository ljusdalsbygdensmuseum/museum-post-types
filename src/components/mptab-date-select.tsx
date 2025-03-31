import { useState } from 'react'
import { DatePicker, ToggleControl } from '@wordpress/components'
import { Dates, DateInputEvent } from '../types/mptab-date-types'

interface Props {
	dates: Dates
	input: HTMLInputElement[]
}

export function MPTABDateSelect({ dates, input }: Props) {
	const getAllDates = (dates: Dates) => {
		const allDates = dates.map((item) => {
			return { date: new Date(parseInt(item.date)) }
		})
		return allDates
	}

	const [dateParam, setDateParam] = useState(dates)
	const [allDates, setAllDates] = useState(getAllDates(dates))

	const [multipleState, setMultipleState] = useState(false)
	const [removeState, setRemoveState] = useState(false)
	const [prevDate, setPrevDate] = useState(new Date())

	const begOrEndDate = (newDate: Date, allDates: Dates) => {
		let begDate = new Date(newDate).getTime()
		let endDate = new Date(newDate).getTime()

		allDates.forEach((compareDate) => {
			if (
				new Date(parseInt(compareDate.date)).getTime() <
				new Date(begDate).getTime()
			) {
				begDate = new Date(parseInt(compareDate.date)).getTime()
			}
			if (
				new Date(parseInt(compareDate.date)).getTime() >
				new Date(endDate).getTime()
			) {
				endDate = new Date(parseInt(compareDate.date)).getTime()
			}
		})
		input[1].value = String(new Date(begDate).getTime())
		input[2].value = String(new Date(endDate).getTime())
	}
	const addDate = (newDate: Date) => {
		setDateParam((currentDate) => {
			const newDates = [
				...currentDate,
				{ date: String(new Date(newDate).getTime()) },
			]
			begOrEndDate(newDate, newDates)
			input[0].value = JSON.stringify(newDates)
			setAllDates(getAllDates(newDates))
			return newDates
		})
	}

	const removeDate = (newDate: Date) => {
		setDateParam((dates) => {
			const newDates = dates.filter(
				(compareItem) =>
					newDate.toDateString() !== new Date(compareItem.date).toDateString()
			)
			begOrEndDate(new Date(newDates[0].date), [...newDates])
			input[0].value = JSON.stringify([...newDates])
			setAllDates(getAllDates(newDates))
			return [...newDates]
		})
	}

	const changeDates = (newDate: Date) => {
		let startDate = new Date(newDate)

		if (
			!multipleState ||
			startDate.toDateString() === prevDate.toDateString()
		) {
			removeState ? removeDate(startDate) : addDate(startDate)
		} else if (multipleState && startDate > prevDate) {
			while (startDate >= prevDate) {
				const thisDate = new Date(startDate)
				removeState ? removeDate(thisDate) : addDate(thisDate)
				startDate = new Date(startDate.setDate(startDate.getDate() - 1))
			}
		} else if (multipleState && startDate < prevDate) {
			while (startDate <= prevDate) {
				const thisDate = new Date(startDate)
				removeState ? removeDate(thisDate) : addDate(thisDate)
				startDate = new Date(startDate.setDate(startDate.getDate() + 1))
			}
		}

		setPrevDate(() => new Date(newDate))
	}

	return (
		<>
			<DatePicker
				startOfWeek={1}
				currentDate={null}
				events={allDates}
				onChange={(newDate) => changeDates(new Date(newDate))}
			/>

			<ToggleControl
				label='Select multiple days'
				checked={multipleState}
				onChange={(value) => setMultipleState(() => value)}
			/>

			<ToggleControl
				label='Remove days'
				checked={removeState}
				onChange={(value) => setRemoveState(() => value)}
			/>
		</>
	)
}
