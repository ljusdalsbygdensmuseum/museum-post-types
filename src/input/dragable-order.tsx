import { Panel, PanelBody } from '@wordpress/components'
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
		<ReactSortable
			list={listItems}
			setList={(newItems) => {
				if (input) {
					input.value = JSON.stringify(newItems)
				}
				setListItems(newItems)
			}}
		>
			{listItems.map((item) => {
				return (
					<Panel key={item.id}>
						<PanelBody>{item.title}</PanelBody>
					</Panel>
				)
			})}
		</ReactSortable>
	)
}
