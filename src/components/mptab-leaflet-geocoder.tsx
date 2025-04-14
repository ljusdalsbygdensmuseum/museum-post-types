import { useEffect } from 'react'
import { useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import { Geocoder, geocoders } from 'leaflet-control-geocoder'
import L from 'leaflet'

interface Props {
	address: string
}

export function MPTABGeocoder({ address }: Props) {
	const map = useMap()
	useEffect(() => {
		const geocoder = new geocoders.Nominatim()

		geocoder.geocode(address).then((result) => {
			if (!result.length) {
				return
			}
			map.fitBounds(result[0].bbox)
			console.log(result)
			return (
				<>
					<Marker position={result[0].center}></Marker>
				</>
			)
		})
	}, [address])
	return null
}
