import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Icon } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import '../sass/settings/settings_page.scss'
import { MPTABGeocoder } from './mptab-leaflet-geocoder'
import { MPTABClicker } from './mptab-leaflet-clicker'

import icon from '../../img/marker.png'
import iconShadow from '../../img/marker_shadow.png'

interface Props {
	searchable: boolean
	location: L.LatLngExpression
	searchInput: HTMLInputElement | null
}

export function MPTABMap({ searchable, location, searchInput }: Props) {
	const [marker, setMarker] = useState(location)

	const customIcon = new Icon({
		iconUrl: icon,
		iconSize: [36, 36],
		iconAnchor: [18, 36],
		shadowUrl: iconShadow,
		shadowSize: [36, 36],
		shadowAnchor: [6, 30],
	})

	const geocodeMarker = (location: L.LatLngExpression) => {
		setMarker(location)
	}
	if (searchInput) {
		searchInput.value = JSON.stringify(marker)
	}

	return (
		<>
			<MapContainer center={location} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{searchable === true ? (
					<>
						<MPTABGeocoder setMarker={geocodeMarker} />
						<MPTABClicker setMarker={geocodeMarker} />
					</>
				) : (
					''
				)}
				<Marker position={marker} icon={customIcon}></Marker>
			</MapContainer>
		</>
	)
}
