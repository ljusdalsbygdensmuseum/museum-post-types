import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'

import { SettingsSchema, Settings } from '../types/mptab-rest-types'

export function MPTABDisplayPhone() {
	const defaultData: Settings = {
		phone: '',
		adress: {
			adress: '',
			city: '',
			areacode: '',
			latlng: { lat: 0, lng: 0 },
		},
	}
	const [data, setData] = useState(defaultData)

	//get the rest data
	useEffect(() => {
		apiFetch({ path: 'mptab/v1/settings' }).then((restData) => {
			if (typeof restData == 'object' && restData != undefined) {
				if (SettingsSchema.safeParse(restData).success) {
					setData(SettingsSchema.parse(restData))
				} else {
					console.log(SettingsSchema.safeParse(restData))
				}
			}
		})
	}, [])
	return data.phone
}
