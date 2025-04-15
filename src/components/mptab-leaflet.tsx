import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import '../sass/settings/settings_page.scss'
import { MPTABGeocoder } from './mptab-leaflet-geocoder'

interface Props {
	searchable: boolean
	location: L.LatLngExpression
	searchInput: HTMLInputElement | null
}

export function MPTABMap({ searchable, location, searchInput }: Props) {
	const [marker, setMarker] = useState(location)

	const geocodeMarker = (location: L.LatLngExpression) => {
		setMarker(location)
	}
	if (searchInput) {
		searchInput.value = JSON.stringify(marker)
	}

	return (
		<MapContainer center={location} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{searchable === true ? <MPTABGeocoder setMarker={geocodeMarker} /> : ''}
			<Marker position={marker}></Marker>
		</MapContainer>
	)
}
