import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { motion } from 'motion/react'

import { MPTABEvent } from '../components/mptab-event'

import {
	CurentCommingEventSchema,
	CurentCommingEvent,
} from '../types/mptab-rest-types'

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

	//motion variants
	const motionHeading = {
		initial: { opacity: 0, y: 15 },
		visible: { opacity: 1, y: 0 },
	}

	return (
		<section>
			{current.length ? (
				<div className='mptab_event_display_current'>
					<motion.h2
						variants={motionHeading}
						initial={'initial'}
						whileInView={'visible'}
						viewport={{ once: true, margin: '-20px' }}
					>
						{__('Right now', 'mptab-domain')}
					</motion.h2>
					{current}
				</div>
			) : (
				''
			)}
			{comming.length ? (
				<div className='mptab_event_display_comming'>
					<motion.h2
						variants={motionHeading}
						initial={'initial'}
						whileInView={'visible'}
						viewport={{ once: true, margin: '-20px' }}
					>
						{__('Coming', 'mptab-domain')}
					</motion.h2>
					{comming}
				</div>
			) : (
				''
			)}
		</section>
	)
}
