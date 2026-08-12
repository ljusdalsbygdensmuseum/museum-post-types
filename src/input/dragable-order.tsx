import { DragList } from '../types/mptab-list-types'

interface Props {
	items: DragList
}

export default function DragableOrder({ items }: Props) {
	const list = items.map((item) => {
		return <li>{item.title}</li>
	})
	return <>{list}</>
}
