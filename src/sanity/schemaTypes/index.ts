import {type SchemaTypeDefinition} from 'sanity'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {socialPostType} from './socialPostType'
import {socialSettingsType} from './socialSettingsType'
import {socialAccountType} from './socialAccountType'
import {socialConnectionRequestType} from './socialConnectionRequestType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [blockContentType, categoryType, postType, authorType, socialPostType, socialSettingsType, socialAccountType, socialConnectionRequestType],
}
