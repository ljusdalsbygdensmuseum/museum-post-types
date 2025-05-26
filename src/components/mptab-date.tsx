import { __ } from '@wordpress/i18n'

import { Dates } from '../types/mptab-date-types'

interface Props {
	post_type: string
	dates: Dates
	alias: string[]
}
export function MPTABDate({ post_type, dates, alias }: Props) {
	let displayDates = ''
	dates
		.sort((dateA, dateB) => {
			return (
				new Date(parseInt(dateA.date)).getTime() -
				new Date(parseInt(dateB.date)).getTime()
			)
		})
		.forEach((item, index) => {
			let date = `${new Date(parseInt(item.date)).getDate()}/${new Date(
				parseInt(item.date)
			).getMonth()}` // change formating to 12 september insted of 12/9
			if (alias[index]) {
				date = alias[index]
			}
			if (post_type == 'mptab_exhibition' && !index) {
				date = date + ' - '
			}
			if (post_type == 'mptab_event' && index != dates.length - 1) {
				date = date + ', '
			}
			displayDates += date
		})

	return <>{alias[0] && post_type == 'mptab_event' ? alias[0] : displayDates}</>
}
