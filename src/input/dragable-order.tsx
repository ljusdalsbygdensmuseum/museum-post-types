import { Panel, PanelBody, PanelRow } from '@wordpress/components'
import { IconButton, Link, Stack, Text } from '@wordpress/ui'
import { chevronUp, chevronDown } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ReactSortable } from 'react-sortablejs/dist'

import { DragList } from '../types/mptab-list-types'

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
				{listItems.map((item, index, array) => {
					return (
						<motion.div
							layout={layoutState}
							transition={{ layout: { duration: 0.1 } }}
							key={item.id}
						>
							<PanelBody>
								<PanelRow>
									<Stack gap='md' align='center'>
										<Stack
											direction='column'
											style={{
												paddingRight: '0.5rem',
												borderRight: '2px solid #F0F0F0',
											}}
										>
											<IconButton
												tone='neutral'
												variant='minimal'
												size='small'
												icon={chevronUp}
												disabled={index == 0}
												label={item.title + ' ' + __('up', 'mptab-domain')}
												onClick={() => moveItem(index, index - 1)}
											/>
											<IconButton
												tone='neutral'
												variant='minimal'
												size='small'
												icon={chevronDown}
												disabled={index == array.length - 1}
												label={item.title + ' ' + __('down', 'mptab-domain')}
												onClick={() => moveItem(index, index + 1)}
											/>
										</Stack>

										<Text variant='heading-xl'>{item.title}</Text>

										{item.url && (
											<Link href={item.url} openInNewTab>
												{__('View', 'mptab-domain')}
											</Link>
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
