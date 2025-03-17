import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'

import { EventsObjectSchema } from '../types/mptab-rest-types'

interface Props {
	path: string
}
export function MPTABDisplayEvent({ path }: Props) {
	const [data, setData] = useState({})

	//get the rest data
	useEffect(() => {
		apiFetch({ path: path }).then((restData) => {
			if (typeof restData == 'object' && restData != undefined) {
				if (EventsObjectSchema.safeParse(restData).success) {
					setData(EventsObjectSchema.parse(restData))
				} else {
					console.log(EventsObjectSchema.safeParse(restData))
				}
			}
		})
	}, [])
	return 'allEvents'
}
