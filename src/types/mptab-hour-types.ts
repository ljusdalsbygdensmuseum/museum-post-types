import { z } from 'zod'

export const TimeInputValueSchema = z.object({
	// from '@wordpress/components/build-types/date-time/types'
	hours: z.number(),
	minutes: z.number(),
})

export const HourSchema = z.object({
	open: TimeInputValueSchema,
	close: TimeInputValueSchema,
})

export const HoursSchema = z.array(HourSchema)

export type TimeInputValue = z.infer<typeof TimeInputValueSchema>

export type Hour = z.infer<typeof HourSchema>

export type Hours = z.infer<typeof HoursSchema>
