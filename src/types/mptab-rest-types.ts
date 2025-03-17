import z from 'zod'

import { DatesSchema } from './mptab-date-types'
import { HoursSchema } from './mptab-hour-types'

export const EventObjectSchema = z.object({
	ID: z.number(),
	post_type: z.string(),
	url: z.string().url(),
	title: z.string(),
	exerpt: z.string(),
	thumbnail: z.union([z.boolean(), z.string().url()]),
	permanent: z.string().optional(),
	hours: HoursSchema.optional(),
	dates: DatesSchema,
	alias: z.array(z.string()),
})
export const EventsObjectSchema = z.array(EventObjectSchema)
