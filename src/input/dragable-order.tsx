import { Panel, PanelBody, PanelRow } from '@wordpress/components'
import { IconButton, Stack } from '@wordpress/ui'
import { chevronUp, chevronDown } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'
import { DragList } from '../types/mptab-list-types'

import { useState, type DragEvent } from 'react'
import { motion } from 'motion/react'
import { ReactSortable } from 'react-sortablejs/dist'

interface Props {
	items: DragList
	input?: HTMLInputElement
}

export default function DragableOrder({ items, input }: Props) {
	const [listItems, setListItems] = useState<DragList>(items)
	const [layoutState, setLayoutState] = useState(true)

	function setInput(list: DragList) {
		list.forEach((item, index) => {
			item.order = index
			return item
		})
		if (input) {
			input.value = JSON.stringify(list)
		}
	}

	function moveItem(index: number, newIndex: number) {
		const modifiedItems = listItems.concat([])

		modifiedItems.splice(index, 1)

		modifiedItems.splice(newIndex, 0, listItems[index])

		setInput(modifiedItems)
		setListItems(modifiedItems)
	}

	return (
		<Panel>
			<ReactSortable
				list={listItems}
				setList={(newItems) => {
					const modifiedItems = newItems.concat([])

					setInput(modifiedItems)
					setListItems(modifiedItems)
				}}
				animation={100}
				onStart={() => setLayoutState(false)}
				onEnd={() => setLayoutState(true)}
			>
				{listItems.map((item, index) => {
					//remove up and down btn if first or last

					return (
						<motion.div
							layout={layoutState}
							transition={{ layout: { duration: 0.1 } }}
							key={item.id}
						>
							<PanelBody>
								<PanelRow>
									<Stack gap='sm' align='center'>
										<Stack direction='column'>
											<IconButton
												tone='neutral'
												variant='minimal'
												size='small'
												icon={chevronUp}
												label={item.title + ' ' + __('up', 'mptab-domain')}
												onClick={() => moveItem(index, index - 1)}
											/>
											<IconButton
												tone='neutral'
												variant='minimal'
												size='small'
												icon={chevronDown}
												label={item.title + ' ' + __('down', 'mptab-domain')}
												onClick={() => moveItem(index, index + 1)}
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
						</motion.div>
					)
				})}
			</ReactSortable>
		</Panel>
	)
}
