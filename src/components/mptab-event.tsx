import { __ } from '@wordpress/i18n'

import { EventObject } from '../types/mptab-rest-types'
import { Dates } from '../types/mptab-date-types'
import { MPTABDate } from './mptab-date'
interface Props {
	item: EventObject
}

import defaultImg from '../../img/default_event.png'

export function MPTABEvent({ item }: Props) {
	const img =
		item.thumbnail && item.thumbnail != true ? item.thumbnail : defaultImg
	return (
		<div className='mptab_event mptab_event_display mptab_event_display_min'>
			<div
				className=' mptab_event_display_img'
				style={{ backgroundImage: `url(${img})` }}
			></div>
			<div className=' mptab_event_display_info'>
				<div className='mptab_event_display_text'>
					<h3 className='mptab_event_display_heading'>{item.title}</h3>
					{(item.post_type == 'mptab_exhibition' ||
						item.post_type == 'mptab_event') &&
					item.dates != null &&
					item.alias != null ? (
						<p className='mptab_event_display_date'>
							<MPTABDate
								post_type={item.post_type}
								dates={item.dates}
								alias={item.alias}
							/>
						</p>
					) : (
						''
					)}
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
