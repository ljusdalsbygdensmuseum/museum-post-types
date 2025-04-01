import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'

import { MPTABEvent } from '../components/mptab-event'

import { ServicesSchema, Services } from '../types/mptab-rest-types'

export function MPTABDisplayServices() {
	const defaultData: Services = []
	const [data, setData] = useState(defaultData)

	//get the rest data
	useEffect(() => {
		apiFetch({ path: 'mptab/v1/services' }).then((restData) => {
			if (typeof restData == 'object' && restData != undefined) {
				if (ServicesSchema.safeParse(restData).success) {
					setData(ServicesSchema.parse(restData))
				} else {
					console.log(ServicesSchema.safeParse(restData))
				}
			}
		})
	}, [])
	const services = data.map((item) => {
		return <MPTABEvent item={item} />
	})

	return (
		<section>
			<h2>{__('Services', 'mptab-domain')}</h2>
			{services}
		</section>
	)
}
