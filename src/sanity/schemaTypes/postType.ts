import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      description: 'A 2-3 sentence summary of the article that will display on the blog cards.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Insight',
      type: 'boolean',
      description: 'Toggle this ON to make this the main featured article at the top of the blog page. (Only turn this on for one article at a time!)',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'externalLink',
      title: 'LinkedIn / External URL (Optional)',
      type: 'url',
      description: 'If this is a LinkedIn post, paste the link here. When users click the article, it will take them directly to LinkedIn. (You can leave the Body empty if you use this).',
    }),
    defineField({
      name: 'socialSharing',
      title: 'Social Sharing',
      type: 'object',
      description: 'Preferences for social posts generated from this article. No automatic publishing is active yet.',
      fields: [
        defineField({name: 'enabled', title: 'Prepare Social Posts', type: 'boolean', initialValue: false}),
        defineField({name: 'platforms', type: 'array', of: [{type: 'string', options: {list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'LinkedIn', value: 'linkedin'},
        ]}}], validation: (Rule) => Rule.unique()}),
        defineField({name: 'approvalRequired', title: 'Require Approval', type: 'boolean', initialValue: true}),
      ],
    }),
    defineField({
      name: 'articlePdf',
      title: 'Upload Article Documents (Optional)',
      type: 'file',
      description: 'Upload a downloadable version of this insight (supports PDF, Word, Excel, PowerPoint, and Text files).',
      options: {
        accept: '.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt'
      }
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
