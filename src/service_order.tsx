import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { ServiceOrder } from './components/mptab-service-order'

domReady(() => {
	const container = document.getElementById('mptab-service-order')
	if (!container) {
		return <p>{__('Loading ...', 'mptab-domain')}</p>
	}
	const root = createRoot(container)

	root.render(
		<>
			<ServiceOrder />
		</>,
	)
})
