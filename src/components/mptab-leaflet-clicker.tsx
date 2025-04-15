import { useMapEvent } from 'react-leaflet'

interface Props {
	setMarker: (location: L.LatLngExpression) => void
}

export function MPTABClicker({ setMarker }: Props) {
	const map = useMapEvent('click', (event) => {
		setMarker(event.latlng)
		map.flyTo(event.latlng)
	})

	return null
}
