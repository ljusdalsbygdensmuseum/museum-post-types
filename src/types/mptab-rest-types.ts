import z from 'zod'

//Exhib event

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

//Service

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

//Settings

//latlng copied from @types/leaflet
export const LatLngSchema = z.object({
	lat: z.number(),
	lng: z.number(),
	alt: z.number().optional(),
})

export const LatLngTupleSchema = z.tuple([
	z.number(),
	z.number(),
	z.number().optional(),
])

export const LatLngExpressionSchema = z.union([LatLngSchema, LatLngTupleSchema])

export const FullAdressSchema = z.object({
	adress: z.string(),
	city: z.string(),
	areacode: z.string(),
	latlng: LatLngExpressionSchema,
})

export type FullAdress = z.infer<typeof FullAdressSchema>

export const SettingsSchema = z.object({
	phone: z.string(),
	adress: FullAdressSchema,
})

export type Settings = z.infer<typeof SettingsSchema>
