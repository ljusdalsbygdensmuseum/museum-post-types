import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

import { Geocoder } from 'leaflet-control-geocoder'
import { MarkGeocodeEvent } from 'leaflet-control-geocoder/dist/control'

interface Props {
	setMarker: (location: L.LatLngExpression) => void
}

export function MPTABGeocoder({ setMarker }: Props) {
	const map = useMap()
	useEffect(() => {
		const GeocoderControl = new Geocoder({
			defaultMarkGeocode: false,
		})
		GeocoderControl.addTo(map)
		GeocoderControl.on('markgeocode', function (event: MarkGeocodeEvent) {
			map.flyToBounds(event.geocode.bbox)
			setMarker(event.geocode.center)
		})
	}, [])
	return null
}
