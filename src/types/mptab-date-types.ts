import { z } from 'zod'

export const DatePickerEventSchema = z.object({
	// from "@wordpress/components/build-types/date-time/types"
	date: z.string(),
})

export const DatesSchema = z.array(DatePickerEventSchema)

export const DatesRangeSchema = z.object({
	start: DatePickerEventSchema,
	end: DatePickerEventSchema,
})

export const DateInputEventSchema = z.object({
	// from "@wordpress/components/build-types/date-time/types"
	date: z.date(),
})

export type Dates = z.infer<typeof DatesSchema>

export type DatesRange = z.infer<typeof DatesRangeSchema>

export type DateInputEvent = z.infer<typeof DateInputEventSchema>
