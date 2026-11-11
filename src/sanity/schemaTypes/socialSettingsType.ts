import {defineField, defineType} from 'sanity'

export const socialSettingsType = defineType({
  name: 'socialSettings',
  title: 'Social Publishing Settings',
  type: 'document',
  fields: [
    defineField({name: 'enabled', title: 'Enable Social Publishing', type: 'boolean', initialValue: false, description: 'Configuration only; publishing is not connected in Phase 1.'}),
    defineField({name: 'approvalRequired', title: 'Require Approval', type: 'boolean', initialValue: true}),
    defineField({name: 'defaultPlatforms', type: 'array', of: [{type: 'string', options: {list: [
      {title: 'Facebook', value: 'facebook'},
      {title: 'Instagram', value: 'instagram'},
      {title: 'LinkedIn', value: 'linkedin'},
    ]}}], options: {layout: 'grid'}, validation: (Rule) => Rule.unique()}),
    defineField({name: 'defaultCaptionInstructions', title: 'Caption Style Instructions', type: 'text', rows: 4}),
  ],
  preview: {prepare: () => ({title: 'Social Publishing Settings'})},
})
