import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'

import { SettingsSchema, Settings } from '../types/mptab-rest-types'

import { MPTABMap } from '../components/mptab-leaflet'

export function MPTABDisplayMap() {
	const [map, setMap] = useState(<p>loading...</p>)

	//get the rest data
	useEffect(() => {
		apiFetch({ path: 'mptab/v1/settings' }).then((restData) => {
			if (typeof restData == 'object' && restData != undefined) {
				if (SettingsSchema.safeParse(restData).success) {
					const data: Settings = SettingsSchema.parse(restData)

					const adress = (
						<span>
							<strong>{data.adress.adress}</strong>
							<br />
							{data.adress.areacode}
							<br />
							<strong>{data.adress.city}</strong>
						</span>
					)

					setMap(
						<MPTABMap
							location={data.adress.latlng}
							searchable={false}
							visibleAdress={adress}
						/>
					)
				} else {
					console.log(SettingsSchema.safeParse(restData))
				}
			}
		})
	}, [])

	return <>{map}</>
}
