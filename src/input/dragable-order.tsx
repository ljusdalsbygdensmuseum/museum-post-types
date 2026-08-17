import { Draggable, Panel, PanelBody } from '@wordpress/components'
import { DragList } from '../types/mptab-list-types'

import type { DragEvent } from 'react'

interface Props {
	items: DragList
}

export default function DragableOrder({ items }: Props) {
	const onDragStart = (event: DragEvent) => {
		console.log('drag')
	}
	const onDragEnd = (event: DragEvent) => {
		console.log('drop')
	}

	const list = items.map((item) => {
		return (
			<Panel>
				<PanelBody>
					<Draggable
						elementId={`dragelem-${item.id}`}
						transferData={{}}
						onDragStart={onDragStart}
						onDragEnd={onDragEnd}
					>
						{({ onDraggableStart, onDraggableEnd }) => (
							<div
								draggable
								onDragStart={onDraggableStart}
								onDragEnd={onDraggableEnd}
							>
								<p>{item.title}</p>
							</div>
						)}
					</Draggable>
				</PanelBody>
			</Panel>
		)
	})
	return <>{list}</>
}
