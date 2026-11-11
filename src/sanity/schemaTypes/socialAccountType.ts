import {defineField, defineType} from 'sanity'

export const socialAccountType = defineType({
  name: 'socialAccount',
  title: 'Social Account',
  type: 'document',
  fields: [
    defineField({name: 'platform', type: 'string', readOnly: true, options: {list: [
      {title: 'Facebook', value: 'facebook'},
      {title: 'Instagram', value: 'instagram'},
      {title: 'LinkedIn', value: 'linkedin'},
    ]}, validation: (Rule) => Rule.required()}),
    defineField({name: 'displayName', type: 'string', readOnly: true, validation: (Rule) => Rule.required()}),
    defineField({name: 'platformAccountId', title: 'Platform Account ID', type: 'string', readOnly: true, description: 'Non-secret account identifier.'}),
    defineField({name: 'profileUrl', type: 'url', readOnly: true}),
    defineField({name: 'connectedAt', title: 'Connected At', type: 'datetime', readOnly: true}),
    defineField({name: 'tokenExpiresAt', title: 'Token Expires At', type: 'datetime', readOnly: true}),
    defineField({name: 'connectionStatus', type: 'string', initialValue: 'notConnected', readOnly: true, options: {list: [
      {title: 'Not connected', value: 'notConnected'},
      {title: 'Connected', value: 'connected'},
      {title: 'Reconnect required', value: 'reconnectRequired'},
    ]}, description: 'Managed by the server-side connection workflow.'}),
  ],
  preview: {select: {title: 'displayName', platform: 'platform', status: 'connectionStatus'}, prepare: ({title, platform, status}) => ({title, subtitle: [platform, status].filter(Boolean).join(' • ')})},
})
