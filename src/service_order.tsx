import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import DragableOrder from './input/dragable-order'

domReady(() => {
	const serviceDataContainer = document.getElementById(
		'mptab-service-order-data',
	)
	if (!serviceDataContainer) {
		throw new Error('mptab-service-order-data was not found')
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
