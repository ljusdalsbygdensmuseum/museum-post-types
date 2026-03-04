import React, { useEffect, useState } from 'react'
import apiFetch from '@wordpress/api-fetch'
import { MPTABDate } from '../../src/components/mptab-date'
import { WP_REST_API_Exhib } from '../../src/types/mptab-rest-types'
import { Dates } from '../../src/types/mptab-date-types'

interface Props {
	route: string
}

const MptabDisplayDates = ({ route }: Props) => {
	const [dates, setDates] = useState<Dates>()
	const [alias, setAlias] = useState<string[]>([])
	const [postType, setPostType] = useState('')

	useEffect(() => {
		apiFetch<WP_REST_API_Exhib>({ path: route }).then(
			(data: WP_REST_API_Exhib) => {
				setPostType(data.type)
				if (!data.mptab_date.dates) {
					return
				}
				setDates(data.mptab_date.dates)
				if (data.mptab_date.alias) {
					setAlias(data.mptab_date.alias)
				}
			},
		)
	}, [])

	return <MPTABDate dates={dates} alias={alias} post_type={postType} />
}

export default MptabDisplayDates
