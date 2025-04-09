import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch'

import 'leaflet/dist/leaflet.css'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import '../sass/settings/settings_page.scss'

interface Props {
	key: number
	location: L.LatLngExpression
}

export function MPTABMap({ key, location }: Props) {
	console.log(key)
	console.log(location)

	return (
		<MapContainer center={location} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<EsriLeafletGeoSearch />
		</MapContainer>
	)
}
