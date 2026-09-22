import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { AnimatePresence, motion } from 'motion/react'

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

	return (
		<AnimatePresence mode='wait'>
			{data ? (
				<motion.span
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					className='mptab-adress__text'
				>
					<strong className='adress-main-line'>{data.adress.adress}</strong>
					<br />
					{data.adress.areacode} {data.adress.city}
				</motion.span>
			) : (
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='mptab-adress__skeleton'
				>
					<div className='mptab-adress__skeleton-main'></div>
					<div className='mptab-adress__skeleton-secondary'></div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
