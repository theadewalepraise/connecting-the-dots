import {defineField, defineType} from 'sanity'

/**
 * Short-lived, one-time authorization challenge.
 * Created only by an authenticated Studio editor and validated server-side.
 * It contains a SHA-256 hash, never an OAuth token or raw nonce.
 */
export const socialConnectionRequestType = defineType({
  name: 'socialConnectionRequest',
  title: 'Social Connection Request (Internal)',
  type: 'document',
  fields: [
    defineField({name: 'provider', type: 'string', readOnly: true, options: {list: [
      {title: 'Meta', value: 'meta'},
      {title: 'LinkedIn', value: 'linkedin'},
    ]}}),
    defineField({name: 'nonceHash', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'expiresAt', type: 'datetime', readOnly: true}),
    defineField({name: 'consumedAt', type: 'datetime', readOnly: true}),
  ],
  preview: {select: {title: 'provider'}, prepare: ({title}) => ({
    title: title ? 'Connection request: ' + title : 'Connection request',
  })},
})
