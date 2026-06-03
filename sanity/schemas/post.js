export default {
  name: 'post',
  title: 'Artículo',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', title: 'Extracto', type: 'text' },
    { name: 'content', title: 'Contenido', type: 'blockContent' },
    { name: 'coverImage', title: 'Imagen de portada', type: 'image' },
    { name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
  ],
};
