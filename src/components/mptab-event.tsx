import { __ } from '@wordpress/i18n'

import { EventObject } from '../types/mptab-rest-types'
import { MPTABDate } from './mptab-date'
interface Props {
	item: EventObject
}
export function MPTABEvent({ item }: Props) {
	const img =
		item.thumbnail && item.thumbnail != true
			? item.thumbnail
			: './img/default_event.png' // change to path for default image
	return (
		<div className='row mptab_event mptab_event_display mptab_event_display_min'>
			<div
				className='col mptab_event_display_img'
				style={{ backgroundImage: `url(${img})` }}
			></div>
			<div className='col mptab_event_display_info'>
				<div className='mptab_event_display_text'>
					<h3>{item.title}</h3>
					<p>
						<MPTABDate
							post_type={item.post_type}
							dates={item.dates}
							alias={item.alias}
						/>
					</p>
					<p>{item.exerpt}</p>
				</div>
				<a
					href={item.url}
					className='btn btn-primary mptab_event_display_button'
				>
					{__('Read more', 'mptab-domain')}
				</a>
			</div>
		</div>
	)
}
