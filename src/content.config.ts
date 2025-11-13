import {
  defineCollection,
  reference,
  z,
  type SchemaContext,
} from 'astro:content'
import { glob } from 'astro/loaders'

export type Activity = z.infer<typeof Activity>

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

export type Tier = z.infer<typeof Tier>

export const tiers = [
  'platinum',
  'gold',
  'silver',
  'bronze',
  'introduction',
] as const

const Tier = z.enum(tiers)

export type Role = z.infer<typeof Role>

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

export type Committee = z.infer<typeof Committee>

const Committee = z
  .object({
    name: z.string(),
    role: Role,
    contact: z.coerce.string().url().optional(),
  })
  .array()

const acknowledgements = `DomCode, for letting us take inspiration from their code of conduct;
The staff of Utrecht University's CS department for their support in planning and promotion;
All our volunteers, without whom the conference would not be possible;`

const Edition = z.object({
  name: z.string(),
  date: z.coerce.date().optional(),
  highlights: z.record(z.string(), z.coerce.string()).optional(),
  programme: Programme.optional(),
  speakers: reference('people').array().optional(),
  hosts: reference('people').array().optional(),
  talks: reference('talks').array().optional(),
  workshops: reference('workshops').array().optional(),
  venue: reference('venues').optional(),
  partners: z.record(Tier, reference('partners').array()).optional(),
  committee: Committee,
  acknowledgements: z
    .string()
    .transform(String.prototype.trim)
    .default(acknowledgements),
})

const editions = defineCollection({
  loader: glob({ pattern: '[^_]*.(yml|yaml)', base: './src/content/' }),
  schema: Edition,
})

export type Social = z.infer<typeof Social>

export const socials = [
  'bluesky',
  'facebook',
  'github',
  'glassdoor',
  'instagram',
  'linkedin',
  'twitter',
  'youtube',
  'x',
] as const

const Social = z.enum(socials)

export type Contact = z.infer<typeof Contact>

const Contact = z
  .object({
    website: z.coerce.string().url(),
    mail: z.coerce.string().email(),
    socials: z.record(Social, z.coerce.string().url()),
  })
  .partial()

export type Partner = z.infer<ReturnType<typeof Partner>>

const Partner = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    tier: Tier,
    logo: image(),
    contact: Contact.optional(),
  })

const partners = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/partners/' }),
  schema: Partner,
})

const Person = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    portrait: image().optional(),
    contact: Contact.optional(),
  })

const people = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/people/' }),
  schema: Person,
})

export type Talk = z.infer<typeof Talk>

const Talk = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.string().array().default([]),
  speaker: reference('people'),
})

const talks = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/talks/' }),
  schema: Talk,
})

const Venue = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    location: z.string(),
    image: image(),
    address: z.string().transform(String.prototype.trim),
    directions: z.coerce.string().url(),
    embed: z.coerce.string().url(),
  })

const venues = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/venues/' }),
  schema: Venue,
})

const Workshop = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.string().array().default([]),
  organizer: reference('partners'),
})

const workshops = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/workshops/' }),
  schema: Workshop,
})

export const collections = {
  editions,
  partners,
  people,
  talks,
  venues,
  workshops,
}
