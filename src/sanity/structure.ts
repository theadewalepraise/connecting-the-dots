import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.listItem().title('Blog').child(
        S.list().title('Blog').items([
          S.documentTypeListItem('post').title('Posts'),
          S.documentTypeListItem('category').title('Categories'),
          S.documentTypeListItem('author').title('Authors'),
        ]),
      ),
      S.divider(),
      S.listItem().title('Social Publishing').child(
        S.list().title('Social Publishing').items([
          S.documentTypeListItem('socialPost').title('Social Posts'),
          S.documentTypeListItem('socialAccount').title('Social Accounts'),
          S.listItem().title('Settings').child(
            S.document().schemaType('socialSettings').documentId('socialPublishingSettings'),
          ),
        ]),
      ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'socialPost', 'socialAccount', 'socialSettings'].includes(item.getId()!),
      ),
    ])
