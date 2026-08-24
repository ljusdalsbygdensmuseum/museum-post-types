import { z } from 'zod'

export const ListItemSchema = z.object({
	id: z.number(),
	title: z.string(),
	url: z.string().nullish(),
	order: z.number().default(0),
})

export const DragListSchema = z.array(ListItemSchema)

export type ListItem = z.infer<typeof ListItemSchema>

export type DragList = z.infer<typeof DragListSchema>
