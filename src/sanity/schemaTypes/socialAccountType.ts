import {defineField, defineType} from 'sanity'

export const socialAccountType = defineType({
  name: 'socialAccount',
  title: 'Social Account',
  type: 'document',
  fields: [
    defineField({name: 'platform', type: 'string', options: {list: [
      {title: 'Facebook', value: 'facebook'},
      {title: 'Instagram', value: 'instagram'},
      {title: 'LinkedIn', value: 'linkedin'},
    ]}, validation: (Rule) => Rule.required()}),
    defineField({name: 'displayName', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'platformAccountId', title: 'Platform Account ID', type: 'string', description: 'Non-secret account identifier.'}),
    defineField({name: 'profileUrl', type: 'url'}),
    defineField({name: 'connectionStatus', type: 'string', initialValue: 'notConnected', readOnly: true, options: {list: [
      {title: 'Not connected', value: 'notConnected'},
      {title: 'Connected', value: 'connected'},
      {title: 'Reconnect required', value: 'reconnectRequired'},
    ]}, description: 'Connection management will be implemented later.'}),
  ],
  preview: {select: {title: 'displayName', platform: 'platform', status: 'connectionStatus'}, prepare: ({title, platform, status}) => ({title, subtitle: [platform, status].filter(Boolean).join(' • ')})},
})
