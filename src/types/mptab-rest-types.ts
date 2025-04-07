import z, { ZodString } from 'zod'

import { DatesSchema } from './mptab-date-types'
import { HoursSchema } from './mptab-hour-types'

export const EventObjectSchema = z.object({
	ID: z.number(),
	post_type: z.string(),
	url: z.string().url(),
	title: z.string(),
	exerpt: z.string(),
	thumbnail: z.union([z.boolean(), z.string().url()]),
	permanent: z.string().nullish(),
	hours: HoursSchema.nullish(),
	dates: DatesSchema.nullish(),
	alias: z.array(z.string()).nullish(),
})
export const CurentCommingEventSchema = z.object({
	current: z.array(EventObjectSchema),
	comming: z.array(EventObjectSchema),
})

export type EventObject = z.infer<typeof EventObjectSchema>

export type CurentCommingEvent = z.infer<typeof CurentCommingEventSchema>

export const ServiceObjectSchema = z.object({
	ID: z.number(),
	post_type: z.string(),
	url: z.string().url(),
	title: z.string(),
	exerpt: z.string(),
	thumbnail: z.union([z.boolean(), z.string().url()]),
})

export const ServicesSchema = z.array(ServiceObjectSchema)

export type ServiceObject = z.infer<typeof ServiceObjectSchema>

export type Services = z.infer<typeof ServicesSchema>

export const SettingsSchema = z.object({
	phone: z.string(),
})

export type Settings = z.infer<typeof SettingsSchema>
