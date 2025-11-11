import { defineCollection, reference, z, type SchemaContext } from 'astro:content'
import { glob } from 'astro/loaders'

export type Programme = z.infer<typeof Programme>

const Programme = z.union([
  z.object({
    time: z.string().time(),
    activities: z.discriminatedUnion('type', [
      z.object({
        type: z.literal('talk'),
        activity: reference('talks'),
      }),
      z.object({
        type: z.literal('workshop'),
        activity: reference('workshops'),
      }),
    ]).array().default([]),
  }),
  z.object({
    time: z.string().time(),
    organizational: z.string(),
  }),
]).array()

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

const Contact = z.object({
  website: z.coerce.string().url().optional(),
  mail: z.coerce.string().email().optional(),
  socials: z
    .record(Social, z.coerce.string().url())
    .default({}),
})

export type Tier = z.infer<typeof Tier>

export const tiers = ['platinum', 'gold', 'silver', 'bronze', 'introduction'] as const

const Tier = z.enum(tiers)

export type Committee = z.infer<typeof Committee>

const Committee = z.object({
  name: z.string(),
  role: Role,
  contact: z.coerce.string().url().optional(),
}).array()

export type Edition = z.infer<typeof Edition>

const Edition = z.object({
  name: z.string(),
  date: z.coerce.date().optional(),
  programme: Programme.optional(),
  talks: reference('speakers').array().optional(),
  workshops: reference('workshops').array().optional(),
  speakers: reference('speakers').array().optional(),
  hosts: reference('hosts').array().optional(),
  host: reference('hosts').optional(),
  partners: z.record(Tier, reference('partners').array()).optional(),
  venue: reference('venues').optional(),
  committee: Committee,
  acknowledgements: z
    .string()
    .transform((val) => val.trim())
    .optional(),
}).transform(({ host, ...edition}) => {
  if (host) {
    let { hosts } = edition

    hosts ??= []
    hosts.push(host)
  }

  return edition
})

const editions = defineCollection({
  loader: glob({ pattern: '[^_]*.(yml|yaml)', base: './src/content/' }),
  schema: Edition,
})

export type Host = z.infer<ReturnType<typeof Host>>

const Host = ({ image }: SchemaContext) => z.object({
  name: z.string(),
  description: z.string().optional(),
  portrait: image().optional(),
  contact: Contact.optional(),
})

const hosts = defineCollection({
  loader: glob({ pattern: ['*/hosts/[^_]*.md', '*/host.md'], base: './src/content/' }),
  schema: Host,
})

export type Partner = z.infer<ReturnType<typeof Partner>>

const Partner = ({ image }: SchemaContext) => z.object({
  name: z.string(),
  description: z.string().optional(),
  // tier: Tier,
  logo: image(),
  contact: Contact.optional(),
})

const partners = defineCollection({
  loader: glob({ pattern: '*/partners/[^_]*.md', base: './src/content/' }),
  schema: Partner,
})

export type Talk = z.infer<typeof Talk>

const Talk = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.string()
    .array()
    .default([]),
  speaker: reference('speakers'),
})

export type Speaker = z.infer<ReturnType<typeof Speaker>>

const Speaker = ({ image }: SchemaContext) => z.object({
  name: z.string(),
  description: z.string().optional(),
  portrait: image().optional(),
  contact: Contact.optional(),
})

const speakers = defineCollection({
  loader: glob({ pattern: '*/speakers/[^_]*.md', base: './src/content/' }),
  schema: Speaker,
})

const talks = defineCollection({
  loader: glob({ pattern: '*/talks/[^_]*.md', base: './src/content/' }),
  schema: Talk,
})

export type Venue = z.infer<ReturnType<typeof Venue>>

const Venue = ({ image }: SchemaContext) => z.object({
  name: z.string(),
  description: z.string().optional(),
  location: z.string(),
  image: image(),
  address: z
    .string()
    .transform((val) => val.split('\n')),
  directions: z.coerce.string().url(),
  embed: z.coerce.string().url(),
})

const venues = defineCollection({
  loader: glob({ pattern: '*/venue.md', base: './src/content/' }),
  schema: Venue,
})

export type Workshop = z.infer<typeof Workshop>

const Workshop = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.string()
    .array()
    .default([]),
  organizer: reference('partners'),
})

const workshops = defineCollection({
  loader: glob({ pattern: '*/workshops/[^_]*.md', base: './src/content/' }),
  schema: Workshop,
})

export const collections = {
  editions,
  hosts,
  partners,
  speakers,
  talks,
  venues,
  workshops,
}
