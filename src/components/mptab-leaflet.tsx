import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Geocoder, geocoders } from 'leaflet-control-geocoder'

import 'leaflet/dist/leaflet.css'
import '../sass/settings/settings_page.scss'
import { MPTABGeocoder } from './mptab-leaflet-geocoder'

interface Props {
	key: number
	location: L.LatLngExpression
}

export function MPTABMap({ key, location }: Props) {
	const [marker, setMarker] = useState(location)

	const geocoding = (address: string) => {
		useEffect(() => {
			const geocoder = new geocoders.Nominatim()

			geocoder.geocode(address).then((result) => {
				if (!result.length) {
					return
				}
				console.log(result)
				setMarker(result[0].center)
			})
		}, [address])
	}
	geocoding('ljusdalsbygdens museum')

	return (
		<MapContainer center={location} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={marker}></Marker>
		</MapContainer>
	)
}
