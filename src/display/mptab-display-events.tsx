import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { motion } from 'motion/react'

import { MPTABEvent } from '../components/mptab-event'

import {
	CurentCommingEventSchema,
	CurentCommingEvent,
} from '../types/mptab-rest-types'
import { AnimatedTitle } from '../components/mptab-animated-title'

interface Props {
	path: string
}
export function MPTABDisplayEvent({ path }: Props) {
	const defaultData: CurentCommingEvent = {
		current: [],
		comming: [],
	}
	const [data, setData] = useState(defaultData)

	//get the rest data
	useEffect(() => {
		apiFetch({ path: path }).then((restData) => {
			if (typeof restData == 'object' && restData != undefined) {
				if (CurentCommingEventSchema.safeParse(restData).success) {
					setData(CurentCommingEventSchema.parse(restData))
				} else {
					console.log(CurentCommingEventSchema.safeParse(restData))
				}
			}
		})
	}, [])
	const current = data.current.map((item) => {
		return <MPTABEvent item={item} />
	})
	const comming = data.comming.map((item) => {
		return <MPTABEvent item={item} />
	})

	return (
		<section>
			{current.length ? (
				<div className='mptab_event_display_current'>
					<AnimatedTitle text={__('Right now', 'mptab-domain')} />
					{current}
				</div>
			) : (
				''
			)}
			{comming.length ? (
				<div className='mptab_event_display_comming'>
					<AnimatedTitle text={__('Coming', 'mptab-domain')} />
					{comming}
				</div>
			) : (
				''
			)}
		</section>
	)
}
