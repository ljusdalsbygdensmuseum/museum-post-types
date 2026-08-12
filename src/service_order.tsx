import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import DragableOrder from './input/dragable-order'
import { DragList } from './types/mptab-list-types'
import { isJSON } from './utility/is-JSON'
import { ServicesSchema } from './types/mptab-rest-types'

domReady(() => {
	const serviceDataContainer = document.getElementById(
		'mptab-service-order-data',
	) as HTMLInputElement | null
	if (!serviceDataContainer) {
		throw new Error('mptab-service-order-data was not found')
	}
	let serviceData: DragList = []
	if (isJSON(serviceDataContainer.value)) {
		const json = JSON.parse(serviceDataContainer.value)
		if (ServicesSchema.safeParse(json)) {
			const data = ServicesSchema.parse(json)
			data.forEach((elem) => {
				serviceData.push({
					id: elem.ID,
					title: elem.title,
					url: elem.url,
					order: 0,
				})
			})
		} else {
			console.log(ServicesSchema.safeParse(json).error)
		}
	}

	const container = document.getElementById('mptab-service-order')
	if (!container) {
		return <p>{__('Loading ...', 'mptab-domain')}</p>
	}
	const root = createRoot(container)

	root.render(
		<>
			<DragableOrder />
		</>,
	)
})
