import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'

import { SettingsSchema, Settings } from '../types/mptab-rest-types'

export function MPTABDisplayPhone() {
	const [data, setData] = useState<Settings | null>(null)

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
	return (
		<>
			{data ? (
				<span>{data.phone}</span>
			) : (
				<div className='mptab-phone__skeleton'></div>
			)}
		</>
	)
}
