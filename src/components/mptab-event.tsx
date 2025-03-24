import { __ } from '@wordpress/i18n'

import { EventObject } from '../types/mptab-rest-types'
interface Props {
	item: EventObject
}
export function MPTABEvent({ item }: Props) {
	const img = item.thumbnail && item.thumbnail != true ? item.thumbnail : 'test'
	return (
		<div className='mptab_event mptab_event_display mptab_event_display_min row'>
			<div
				className='mptab_event mptab_event_display_img col'
				style={{ backgroundImage: `url(${img})` }}
			></div>
			<div className='col'>
				<h3>{item.title}</h3>

				<p>{item.exerpt}</p>
				<a href={item.url}>{__('Read more')}</a>
			</div>
		</div>
	)
}
