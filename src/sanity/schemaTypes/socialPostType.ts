import {defineField, defineType} from 'sanity'

export const socialPostType = defineType({
  name: 'socialPost',
  title: 'Social Post',
  type: 'document',
  fields: [
    defineField({name: 'article', title: 'Source Article', type: 'reference', to: [{type: 'post'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'platform', type: 'string', options: {list: [
      {title: 'Facebook', value: 'facebook'},
      {title: 'Instagram', value: 'instagram'},
      {title: 'LinkedIn', value: 'linkedin'},
    ]}, validation: (Rule) => Rule.required()}),
    defineField({name: 'caption', type: 'text', rows: 7, description: 'Editable caption for this platform.'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}, description: 'Optional platform-specific image; otherwise use the article image.'}),
    defineField({name: 'status', type: 'string', initialValue: 'draft', readOnly: true, options: {list: [
      {title: 'Draft', value: 'draft'},
      {title: 'Pending approval', value: 'pendingApproval'},
      {title: 'Approved', value: 'approved'},
      {title: 'Scheduled', value: 'scheduled'},
      {title: 'Publishing', value: 'publishing'},
      {title: 'Published', value: 'published'},
      {title: 'Failed', value: 'failed'},
      {title: 'Cancelled', value: 'cancelled'},
    ]}, description: 'Updated by the publishing service in a later phase.'}),
    defineField({name: 'scheduledAt', type: 'datetime', description: 'Planned publication time; no scheduler is connected yet.'}),
    defineField({name: 'publishedAt', type: 'datetime', readOnly: true}),
    defineField({name: 'publishedUrl', type: 'url', readOnly: true}),
    defineField({name: 'lastError', type: 'text', readOnly: true}),
    defineField({name: 'attemptCount', type: 'number', readOnly: true, initialValue: 0}),
    defineField({name: 'idempotencyKey', type: 'string', readOnly: true, hidden: true}),
  ],
  preview: {
    select: {title: 'article.title', platform: 'platform', status: 'status', media: 'image'},
    prepare: ({title, platform, status, media}) => ({
      title: title || 'Untitled article',
      subtitle: [platform, status].filter(Boolean).join(' • '),
      media,
    }),
  },
})
