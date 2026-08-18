import { Panel, PanelBody, PanelRow } from '@wordpress/components'
import { IconButton, Stack } from '@wordpress/ui'
import { chevronUp, chevronDown } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'
import { DragList } from '../types/mptab-list-types'

import { useState, type DragEvent } from 'react'
import { ReactSortable } from 'react-sortablejs/dist'

interface Props {
	items: DragList
	input?: HTMLInputElement
}

export default function DragableOrder({ items, input }: Props) {
	const [listItems, setListItems] = useState<DragList>(items)

	return (
		<Panel>
			<ReactSortable
				list={listItems}
				setList={(newItems) => {
					const modifiedItems = newItems.concat([])
					modifiedItems.forEach((item, index) => {
						item.order = index
						return item
					})
					if (input) {
						input.value = JSON.stringify(modifiedItems)
					}

					setListItems(modifiedItems)
				}}
			>
				{listItems.map((item) => {
					return (
						<PanelBody key={item.id}>
							<PanelRow>
								<Stack gap='sm' align='center'>
									<Stack direction='column'>
										<IconButton
											tone='neutral'
											variant='minimal'
											size='small'
											icon={chevronUp}
											label={item.title + ' ' + __('up', 'mptab-domain')}
										/>
										<IconButton
											tone='neutral'
											variant='minimal'
											size='small'
											icon={chevronDown}
											label={item.title + ' ' + __('down', 'mptab-domain')}
										/>
									</Stack>

									{item.url ? (
										<a href={item.url ? item.url : '#'}>{item.title}</a>
									) : (
										<p>{item.title}</p>
									)}
								</Stack>
							</PanelRow>
						</PanelBody>
					)
				})}
			</ReactSortable>
		</Panel>
	)
}
