import {
  defineCollection,
  reference,
  z,
  type SchemaContext,
} from 'astro:content'
import { glob } from 'astro/loaders'

const Activity = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('talk'),
    activity: reference('talks'),
  }),
  z.object({
    type: z.literal('workshop'),
    activity: reference('workshops'),
  }),
])

export type Programme = z.infer<typeof Programme>

const Programme = z
  .object({
    time: z.coerce.string().time(),
    activities: Activity.array(),
    organizational: z.string(),
  })
  .partial({ activities: true, organizational: true })
  .array()
