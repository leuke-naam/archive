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

const Activities = Activity.array()

const Slot = z
  .object({
    time: z.coerce.string().time(),
    activities: Activities,
    organizational: z.string(),
  })
  .partial()
  .required({ time: true })

const Programme = Slot.array()

export const roles = [
  'chair',
  'treasurer',
  'acquisition',
  'speakers',
  'location',
  'promotion',
  'board',
] as const

const Role = z.enum(roles)

const Member = z.object({
  name: z.string(),
  role: Role,
  contact: z.coerce.string().url().optional(),
})

const Committee = Member.array()

const Edition = z
  .object({
    name: z.string(),
    date: z.coerce.date(),
    highlights: z.record(z.string(), z.coerce.string()),
    programme: Programme,
    committee: Committee,
    acknowledgements: z.string().transform(String.prototype.trim),
  })
  .partial()
  .required({ name: true })

const editions = defineCollection({
  loader: glob({ pattern: '[^_]*.(yml|yaml)', base: './src/content/' }),
  schema: Edition,
})

export const collections = {
  editions,
  // people,
  // partners,
  // talks,
  // venues,
  // workshops,
}
