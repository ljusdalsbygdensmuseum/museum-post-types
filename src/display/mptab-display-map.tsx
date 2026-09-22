import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect, ReactElement } from 'react'

import { SettingsSchema, Settings } from '../types/mptab-rest-types'

import { MPTABMap } from '../components/mptab-leaflet'

export function MPTABDisplayMap() {
	const [data, setData] = useState<Settings | null>(null)

	//get the rest data
	useEffect(() => {
		apiFetch({ path: 'mptab/v1/settings' }).then((restData) => {
			if (typeof restData == 'object' && restData != undefined) {
				if (SettingsSchema.safeParse(restData).success) {
					const data: Settings = SettingsSchema.parse(restData)

					setData(data)
				} else {
					console.log(SettingsSchema.safeParse(restData))
				}
			}
		})
	}, [])

	let adress: null | ReactElement = null
	if (data) {
		adress = (
			<span>
				<strong>{data.adress.adress}</strong>
				<br />
				{data.adress.areacode}
				<br />
				<strong>{data.adress.city}</strong>
			</span>
		)
	}

	return (
		<>
			{data ? (
				<div className='mptab-leaflet__container'>
					<MPTABMap
						location={data.adress.latlng}
						searchable={false}
						visibleAdress={adress}
					/>
				</div>
			) : (
				<div className='mptab-leaflet__skeleton'></div>
			)}
		</>
	)
}
