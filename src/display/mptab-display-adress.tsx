import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { motion } from 'motion/react'

import { SettingsSchema, Settings } from '../types/mptab-rest-types'

export function MPTABDisplayAdress() {
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

	if (!data) {
		return
	}

	return (
		<motion.span
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			className='mptab-adress__text'
		>
			<strong className='adress-main-line'>{data.adress.adress}</strong>
			<br />
			{data.adress.areacode} {data.adress.city}
		</motion.span>
	)
}
